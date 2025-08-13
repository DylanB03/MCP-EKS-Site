# MCP - EKS Site
Private site for my portfolio. 
Backend: MCP, Python, Kubernetes / Amazon EKS
Frontend: React

## Local Running

For this to run locally, you require multiple bash terminals.

### Requirements
You need python, uv, a linux distro, and a neo4j graphdb to run this

### .env File

.env file 
```bash
touch .env
```

Sample .env
```bash
web_host="127.0.0.1"
web_port=8080
model_host="0.0.0.0"
model_port=31134
model_name="GEMINI"
mcp_host=0.0.0.0
mcp_port=3000
email="email@provider.com"
phone="1234567890"
GEMINI_API_KEY="ThisIsMyKey12345"

#neo4j specific
NEO4J_URL="bolt://host.docker.internal:7687"
NEO4J_USERNAME="neo4j"
NEO4J_PASSWORD="password"
NEO4J_DATABASE="neo4j"
NEO4J_TRANSPORT="http"
NEO4J_MCP_SERVER_HOST="0.0.0.0"
NEO4J_MCP_SERVER_PORT="8000"
NEO4J_MCP_SERVER_PATH="/mcp"

```
To see more about neo4j configurations, see source code:
https://github.com/neo4j-contrib/mcp-neo4j/blob/main/servers/mcp-neo4j-memory/src/mcp_neo4j_memory/__init__.py


### Server Setups

```bash
#establish virtual environment, install dependencies
uv venv venv
source .venv/bin/activate
uv sync 

#terminal 1
uv run app/mcp/geminiClient
#terminal 2
uv run app/mcp/mcpServer
#terminal 3
chmod +x neo4jBuild.sh
#input the image name, and use it again instead of <my-image>
docker run --env-file .env <my-image>

```

You can now test your MCP servers and clients.
For MCP:
Use a client. An easy one is MCP Inspector
For geminiClient:
Use a curl request to your set host and port.


## Run the Next.js App

### .env.local file
```bash
cd nextjs

touch .env.local
```

Sample:
```
SMTP_HOST=smtp-server.com
SMTP_PORT=587
SMTP_USER=myemail@email.com
SMTP_PASS=myapporemailpassword
TO_EMAIL=myemail@email.com
```

```bash

npm run dev

```

