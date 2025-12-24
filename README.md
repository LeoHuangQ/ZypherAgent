Zypher Agent Project

1. Product - AI Search Engine with context
2. Structure 
	- AI model: Claude Anthropic
    - MCP server for web crawling: Firecrawl
    - Backend - node server + Zypher Agent
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