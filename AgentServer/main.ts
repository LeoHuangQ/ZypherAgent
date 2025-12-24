import {
  AnthropicModelProvider,
  createZypherContext,
  ZypherAgent,
} from "@zypher/agent";
import { eachValueFrom } from "rxjs-for-await";
import { load } from "jsr:@std/dotenv";

await load({ export: true });

function getRequiredEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
}

const zypherContext = await createZypherContext(Deno.cwd());

const agent = new ZypherAgent(
  zypherContext,
  new AnthropicModelProvider({
    apiKey: getRequiredEnv("ANTHROPIC_API_KEY"),
  }),
);

// Register firecrawl
try {
  await agent.mcp.registerServer({
    id: "firecrawl",
    type: "command",
    command: {
      command: "./start-firecrawl.sh",
      args: [getRequiredEnv("FIRECRAWL_API_KEY")],
    },
  });
  console.log("✓ Firecrawl MCP server connected");
} catch (error) {
  console.warn("⚠ Failed to connect firecrawl MCP server:", error);
}

// HTTP Server
Deno.serve({ port: 8000 }, async (req) => {
  const url = new URL(req.url);

  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers, status: 204 });
  }

  if (url.pathname === "/api/search" && req.method === "POST") {
    try {
      const { query } = await req.json();
      console.log("Received a search query:", query);
      const event$ = agent.runTask(query, "claude-sonnet-4-20250514");

      let result = "";
      for await (const event of eachValueFrom(event$)) {
        console.log('the content in the event:', event);
        if((event as any).type == "message" && (event as any).message.role == "assistant"){
          result += (event as any).message.content[0].text;
        }
      }
      console.log("search result: ", result);
      return new Response(JSON.stringify({ success: true, result }), {
        headers: { ...headers, "Content-Type": "application/json" },
        status: 200,
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { headers: { ...headers, "Content-Type": "application/json" }, status: 500 }
      );
    }
  }

  return new Response("Not Found", { status: 404 });
});

console.log("Server running on http://localhost:8000");