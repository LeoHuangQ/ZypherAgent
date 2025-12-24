#!/bin/bash
# Wrapper script to start firecrawl-mcp with Node v20

export FIRECRAWL_API_KEY="$1"
exec /Users/liz1/.nvm/versions/node/v20.19.6/bin/npx firecrawl-mcp
