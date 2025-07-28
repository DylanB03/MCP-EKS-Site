from mcp.server.fastmcp import FastMCP
from app.settings import Settings
import logging
import uvicorn
import json
import httpx
from mcp.shared._httpx_utils import create_mcp_http_client
import mcp.types as types

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

logger = logging.getLogger(__name__)

class GeminiMCPServer:

    def __init__(self, host: str = "0.0.0.0", port: int = 3000):
        self.app = FastMCP(
            name="MCP Server for Gemini",
            event_store=None,
            host=host,
            port=port,
            streamable_http_path="/mcp",
            json_response = True,
            stateless_http=True
            )
        self.load_tools()
        self.run()

    def load_tools(self):

        @self.app.tool()
        async def generate(prompt: str, model: str = "gemini-2.5-flash"):
            async with create_mcp_http_client() as client:
                response = await client.post(
                    url = f"http://127.0.0.1:{Settings.model_port}/generate",
                    json={
                        "model" : model,
                        "prompt" : prompt
                    }
                    )
                response.raise_for_status()
                logger.info(f"answer {response.text}")
            return [types.TextContent(type="text",text=response.text)]
        
        @self.app.tool()
        async def chat(prompt: str, model: str = "gemini-2.5-flash"):
            async with create_mcp_http_client() as client:
                response = await client.post(
                    url = f"http://127.0.0.1:{Settings.model_port}/chat",
                    json={
                        "model" : model,
                        "prompt" : prompt
                    }
                    )
                response.raise_for_status()
                logger.info(f"answer {response.text}")
            return [types.TextContent(type="text",text=response.text)]

        @self.app.tool()
        async def ready():
            async with create_mcp_http_client() as client:
                    response = await client.get(
                        url = f"http://127.0.0.1:{Settings.model_port}",
                        )
                    response.raise_for_status()
                    logger.info(f"answer {response.text}")
            return [types.TextContent(type="text",text=response.text)]
            
    def run(self):
        self.app.run(transport="streamable-http")

if __name__ == "__main__":
    client = GeminiMCPServer(host = Settings.mcp_host, port = Settings.mcp_port)