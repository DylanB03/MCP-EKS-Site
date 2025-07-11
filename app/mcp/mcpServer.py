from mcp.server.lowlevel import Server
from starlette.applications import Starlette
from starlette.routing import Mount
import mcp.types as types
from mcp.server.streamable_http_manager import StreamableHTTPSessionManager
from starlette.types import Receive, Scope, Send
from app.settings import Settings
import logging
import contextlib
from collections.abc import AsyncIterator
import uvicorn
from mcp.shared._httpx_utils import create_mcp_http_client
import json

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

logger = logging.getLogger(__name__)

class GeminiMCPServer:

    def __init__(self, host: str = "0.0.0.0", port: int = 8080):
        

        logger.info(f"Initializing MCP Server at: {host}:{port}")

        self.host = host
        self.port = port
        self.app = Server("MCP Server for Gemini")
        self.session_manager = StreamableHTTPSessionManager(
            app = self.app,
            event_store= None,
            json_response=False
        )
        self.initialize_tools()
        self.setup_mcp()

    def initialize_tools(self):
        @self.app.call_tool()
        async def call_tool(name: str, arguments: dict) -> list[types.ContentBlock]:
            logger.info(f"received name and arguments: {name} \n {arguments}")
            try:
                if name == "generate":
                    return await handle_generate(arguments)
                elif name == "chat":
                    return await handle_chat(arguments)
                elif name == "ready":
                    return await handle_ready()
            except Exception as e:
                logger.error(f"Failed to call tool: {e}")
                return f"Encountered an error: {e}"
        
        async def handle_generate(arguments:dict) -> list[types.ContentBlock]:

            logger.info(f"sending arguments {arguments}")
            async with create_mcp_http_client() as client:
                response = await client.post(
                    url = f"http://{Settings.model_host}:{Settings.model_port}/generate",
                    json=arguments
                    )
                response.raise_for_status()
                logger.info(f"answer {response.text}")
                return [types.TextContent(type="text",text=response.text)]
            
        async def handle_chat(arguments:dict) -> list[types.ContentBlock]:
            #gemini doesnt have a chat feature, so just take the user input and send that as a prompt
            #dont allow system or assistant messages
            prompt = {"prompt" : ""}
            for m in json.loads(arguments["messages"]):
                logger.info(f"sorting a message {m}, {arguments}")
                if m.get("role","")=="user":
                    prompt["prompt"] += m["content"]
            if arguments.get("model",False):
                prompt["model"] = arguments["model"]

            logger.info(f"trying to send a prompt: {prompt}")
            async with create_mcp_http_client() as client:
                response = await client.post(
                    url = f"http://{Settings.model_host}:{Settings.model_port}/chat",
                    json=prompt
                    )
                response.raise_for_status()
                logger.info(f"response {response.text}")
                return [types.TextContent(type="text",text=response.text)]
            
        async def handle_ready() -> list[types.ContentBlock]:
            async with create_mcp_http_client() as client:
                response = await client.get(
                    url = f"http://{Settings.model_host}:{Settings.model_port}",
                    )
                response.raise_for_status()
                logger.info(f"response { response.text}")
                return [types.TextContent(type="text",text=response.text)]

        @self.app.list_tools()
        async def list_tools() -> list[types.Tool]:
            return [
                types.Tool(
                    name="generate",
                    description="Generates text given a prompt",
                    inputSchema={
                        "type" : "object",
                        "required" : ["model","prompt"],
                        "properties" : {
                            "model" : {
                                "type" : "string",
                                "description" : "what model to use"
                            },
                            "prompt" :{
                                "type" : "string",
                                "description" : "prompt for model"
                            }
                        }
                    }
                ),
                types.Tool(
                    name="chat",
                    description="chat with a model",
                    inputSchema={
                        "type" : "object",
                        "required" : ["model","messages"],
                        "properties" : {
                            "model" :{
                                "type" : "string",
                                "descrption" : "what model to use"
                            },
                            "messages" :{
                                "type" : "string",
                                "description" : "messages"
                            }
                        }
                    }
                ),
                types.Tool(
                    name="ready",
                    description="get if Gemini client is working",
                    inputSchema={
                        "type" : "object",
                        "properties" : {}
                    }
                )
            ]
        
    def setup_mcp(self):

        async def handle_streamable_http(
                scope: Scope, receive: Receive, send: Send
        ) -> None:
            await self.session_manager.handle_request(scope,receive,send)

        #manages async resources
        @contextlib.asynccontextmanager
        async def lifespan(app: Starlette) -> AsyncIterator[None]:
            async with self.session_manager.run():
                logger.info("Session manager active")
                try:
                    #maintain execution state upon lifespan iteration
                    yield
                finally:
                    logger.info("Closing session")

        app = Starlette(
            routes = [
                Mount("/mcp",app=handle_streamable_http),
            ],
            lifespan=lifespan
        )

        uvicorn.run(app = app, host = self.host, port = self.port, log_level="info")


def main():
    logger.info("running gemini MCP server...")

    mcp = GeminiMCPServer()

if __name__ == '__main__':
    main()