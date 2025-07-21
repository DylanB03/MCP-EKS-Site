FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install build dependencies
RUN pip install --no-cache-dir hatchling

# Copy dependency files first
COPY pyproject.toml /app/

# Install runtime dependencies
RUN pip install --no-cache-dir fastmcp>=2.0.0 neo4j>=5.26.0

# Copy the source code
COPY src/ /app/src/
COPY README.md /app/

# Install the package
RUN pip install --no-cache-dir -e .

#define key arguments
ARG NEO4J_URL
ARG NEO4J_USERNAME
ARG NEO4J_PASSWORD
ARG NEO4J_DATABASE
ARG NEO4J_TRANSPORT
ARG NEO4J_MCP_SERVER_HOST
ARG NEO4J_MCP_SERVER_PORT
ARG NEO4J_MCP_SERVER_PATH
# Environment variables for Neo4j connection
ENV NEO4J_URL=${NEO4J_URL}
ENV NEO4J_USERNAME=${NEO4J_USERNAME}
ENV NEO4J_PASSWORD=${NEO4J_PASSWORD}
ENV NEO4J_DATABASE=${NEO4J_DATABASE}
ENV NEO4J_TRANSPORT=${NEO4J_TRANSPORT}
ENV NEO4J_MCP_SERVER_HOST=${NEO4J_MCP_SERVER_HOST}
ENV NEO4J_MCP_SERVER_PORT=${NEO4J_MCP_SERVER_PORT}
ENV NEO4J_MCP_SERVER_PATH=${NEO4J_MCP_SERVER_PATH}

# Command to run the server using the package entry point
CMD ["sh", "-c", "mcp-neo4j-memory "]