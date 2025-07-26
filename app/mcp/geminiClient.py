from fastapi import FastAPI
from app.models import GenerateRequest, GenerateResponse, ChatRequest, ChatResponse, ListModelsResponse
import uvicorn
from app.settings import Settings
from google import genai
from google.genai import types
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

class GeminiClient:

    def __init__(self):
        
        self.logger = logging.getLogger(__name__)
        self.app = FastAPI()
        self.routes()
        self.settings = Settings
        self.client = genai.Client(api_key=self.settings.GEMINI_API_KEY) 

    def routes(self):

        self.logger.info("initializing LLM routes")        
        
        @self.app.post("/generate")
        def generate_completion(request: GenerateRequest) -> GenerateResponse:
            self.logger.info(f"generating from a prompt {request.prompt}")
            response = self.client.models.generate_content(
                model=request.model,
                contents=request.prompt,
                config=types.GenerateContentConfig(
                    thinking_config=types.ThinkingConfig(thinking_budget=0)
                ),
            )
            self.logger.info(f"received a response {response.text}")
            return GenerateResponse(response=response.text)
        
        # Gemini does not have a chat feature with messages, but it is free so i am using it
        @self.app.post("/chat")
        def chat_completion(request: GenerateRequest) -> GenerateResponse:
            self.logger.info(f"sending a chat request {request.prompt}")

            #pull relevant data from graphdb
            

            response = self.client.models.generate_content(
                model=request.model,
                config = types.GenerateContentConfig(
                    system_instruction=(
                    "You are a helpful assistant to help with providing information about an admin."
                    f"If asked about email, provide Dylans email: {self.settings.email}"
                    f"If asked about phone number, provide Dylans phone number: {self.settings.phone}"
                    "If asked about work availability, response Spring-Summer 2026"
                    "If asked about skills, list Python, Java, C, AI/ML, MCP, Kubernetes, A2A"
                    "Always respond in the perspective of trying to help people know contact information about Dylan"
                    "If the prompt has nothing to do with either of the 3 information about Dylan, say you cannot answer it."
                    ),
                    thinking_config=types.ThinkingConfig(thinking_budget=0)
                ),
                contents=request.prompt
            )
            self.logger.info(f"received a chat response {response.text}")
            return GenerateResponse(response=response.text)
        
        @self.app.get("/")
        def live():
            return "LLM host running"

        
        
def main():

    host = Settings.model_host
    port = Settings.model_port
    
    ollamaInstance = GeminiClient()
    app = ollamaInstance.app

    uvicorn.run(app,host=host,port=port, log_level="info")

if __name__ == "__main__":
    main()
