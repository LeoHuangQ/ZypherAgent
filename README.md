Zypher Agent Project - Context-Aware AI Search Agent

1. Project Overview
This project demonstrates how to build an AI Agent using Zypher. This project allows the end users act like prompt engineers, providing both a query and contextual instructions. Based on the user’s query and supplied context, the Zypher agent leverages the AI model and tools to  search, reason, and respond intelligently.

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