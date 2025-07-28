import httpx
from app.settings import Settings
import logging
import uuid
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

logger = logging.getLogger(__name__)

class mcpClient:
    
    def __init__(self, mcp_url: str):
        self.settings = Settings
        self.url = mcp_url
        self.httpx_client = httpx.AsyncClient(
            headers= {
                "Content-Type": "application/json",
                "Accept" : "application/json, text/event-stream",
                "User-Agent" : "mcpClient/1.0",
                "x-mcp-version": "1"
            },
            # base_url= self.url,
            timeout = 30
        )

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min = 4, max=10),
        retry= retry_if_exception_type((httpx.TimeoutException,httpx.ConnectError))
    )
    async def make_request(self, method: str, args: dict):
        try:
            json = {
                "jsonrpc": "2.0",
                "id": str(uuid.uuid4()),
                "method": method,
                "params": args
            }
            
            logger.info(f"Sending JSON: {json}")
            response =  await self.httpx_client.post(
                json = json,
                url=self.url,
                headers={
                    "Content-Type": "application/json",
                    "Accept" : "application/json, text/event-stream",
                    "User-Agent" : "mcpClient/1.0",
                    "x-mcp-version": "1"
                }
            )
            response.raise_for_status()

        except httpx.HTTPStatusError as e:
            logger.error(f"Got an HTTp Error: {e}, {e.response}")
            raise
        except httpx.RequestError as e:
            logger.error(f"Request error in MCP request: {e}")
            raise
        except json.JSONDecodeError as e:
            logger.error(f"JSON decode error in MCP response: {e}")
            raise
        except Exception as e:
            logger.error(f"Failed to make request to MCP server: {e}")
            raise
    
    
    async def handle_request(self,tool: str, args: dict):
        try:
            if tool != "list_tools":
                return await self.make_request(
                    method = "tools/call",
                    args = {
                        "name" : tool,
                        "arguments" : args
                    }
                )
            else:
                return await self.make_request(
                    method = "tools/list",
                    args = {}
                )
        except Exception as e:
            logger.error(f"Failed action -  {tool}: {e}")
            
    async def generate_request(self,prompt):
        try:
            return await self.handle_request(
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
                tool = "ready",
                args = {}
            )
        except Exception as e:
            logger.error(f"Failed to make ready request: {e}")
            
    async def list_tools(self):
        try:
            return await self.handle_request(
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
            
    