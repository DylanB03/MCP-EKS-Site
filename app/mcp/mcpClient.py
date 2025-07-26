import httpx
from app.settings import Settings
import logging
import uuid

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

logger = logging.getLogger(__name__)

class mcpClient:
    
    def __init__(self, mcp_url: str):
        self.settings = Settings
        self.httpx_client = httpx.AsyncClient(
            headers= {
                "Content-Type": "application/json",
                "User-Agent" : "mcpClient/1.0"
            },
            base_url= f"{self.settings.mcp_host}:{self.settings.mcp_port}",
            timeout = 10
        )

        
    async def make_request(self, method: str, args: dict):
        try:
            return self.httpx_client.post(
                json={
                "jsonrpc": "2.0",
                "id": str(uuid.uuid4()),
                "method": method,
                "params": args
                }
            )
        except Exception as e:
            logger.error(f"Failed to make request to MCP server: {e}")
    
    async def handle_request(self,tool: str, args: dict):
        try:
            if tool != "list_tools":
                return await self.make_request(
                    self,
                    method = "tools/call",
                    args = {
                        "name" : tool,
                        "arguments" : args
                    }
                )
            else:
                return await self.make_request(
                    self,
                    method = "tools/list",
                    args = {}
                )
        except Exception as e:
            logger.error(f"Failed action -  {tool}: {e}")
            
    async def generate_request(self,prompt):
        try:
            return await self.handle_request(
                self,
                tool = "generate",
                args =  {
                    "model" : "gemini-2.5-flash",
                    "prompt" : prompt
                }
            )
        except Exception as e:
            logger.error(f"Failed to make generate request: {e}")
            
    async def chat_request(self,messages):
        try:
            return await self.handle_request(
                self,
                tool = "chat",
                args = {
                    "model" : "gemini-2.5-flash",
                    "messages" : messages
            })
        except Exception as e:
            logger.error(f"Failed to make chat request: {e}")
            
    async def ready_request(self):
        try:
            return await self.handle_request(
                self,
                tool = "ready",
                args = {}
            )
        except Exception as e:
            logger.error(f"Failed to make ready request: {e}")
            
    async def list_tools(self):
        try:
            return await self.handle_request(
                self,
                tool = "list_tools",
                args = {}
            )
        except Exception as e:
            logger.error(f"Failed to list tools: {e}")
            
    async def close(self):
        try:
            await self.httpx_client.aclose()
            logger.info("Closed httpx client")
        except Exception as e:
            logger.error(f"Failed to close httpx client: {e}")
            
    