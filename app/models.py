from pydantic import BaseModel

class GenerateRequest(BaseModel):
    model : str = "gemini-2.5-flash"
    prompt : str

class GenerateResponse(BaseModel):
    response : str

class ChatRequest(BaseModel):
    model : str = "gemini-2.5-flash"
    messages : list

class ChatResponse(BaseModel):
    message : dict

class ListModelsResponse(BaseModel):
    models : dict