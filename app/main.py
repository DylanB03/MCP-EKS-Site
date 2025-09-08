from app.settings import Settings
import asyncio
from app.mcp.mcpClient import mcpClient
from app.mcp.fastServer import GeminiMCPServer
import threading

async def main():

    def run_gemini():
        geminiClient = GeminiMCPServer()
    #establish threads for every single server
    
    gemini_thread = threading.Thread(target=run_gemini)
    
    gemini_thread.start()
    
    
    url = f"http://127.0.0.1:{Settings.mcp_port}/mcp"
    print(f"Using url: {url}")
    
    s = mcpClient(url)
    print(await s.ready_request())
    print(await s.chat_request("what is 1+1"))
    print(await s.generate_request(prompt="What is 1+1"))
    await s.close()

    return 



if __name__ == "__main__":
    asyncio.run(main())