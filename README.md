Zypher Agent Project - Context-Aware AI Search Agent

1. Project Overview
This project demonstrates how to build an AI Agent using Zypher, CoreSpeed’s agent framework.
End users act like an prompt engineer. Based on the query script context, the Zypher agent uses the AI model and tools to search and reasoning to provide the answers for the user.

2. Structure 
	- AI model: Claude Anthropic
    - Zypher Agent
    - MCP server (Tool): Firecrawl for web crawling
    - Backend - Deno + Node server
	- Frontend - React
3. How to run the project
    - backend command: deno run -A main.ts
        - Server running on http://localhost:8000
    - frontend command: npm run start
        - View agent-ui-search UI at: http://localhost:3000
4. Demo + Test
    - backend: Postman POST http://localhost:8000/api/search with JSON body {"query": "xxx"}
    - frontend: Scenario with different topic and context
5. Improvement
    - Account with registration + Conversation session history management
    - Scale for the server
    - Integrate with other tools to empower