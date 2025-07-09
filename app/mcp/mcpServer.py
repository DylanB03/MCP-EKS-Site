from mcp.server.lowlevel import Server
from starlette.applications import Starlette
from starlette.routing import Mount
import mcp.types as types
from starlette.types import Receive, Scope, Send
from app.settings import Settings
import logging

logger = logging.getLogger(__name__)

app = Server("MCP Server for Ollama")

class OllamaMCPServer:

    def __init__(self, host: str = "0.0.0.0", port: int = 8080):
        

        logger.info(f"Initializing MCP Server at: {host}:{port}")

        self.host = host
        self.port = port

    @app.call_tool()
    async def call_tool(self, name: str, arguments: dict):
        return
    
    @app.list_tools()
    async def list_tools(self) -> list[types.Tool]:
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
                name="list_models",
                description="lists all available models",
                inputSchema={}
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
                description="get if ollama is running (the version)",
                inputSchema={}
            )
        ]


