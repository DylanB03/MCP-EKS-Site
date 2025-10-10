from pydantic import BaseModel, validator

class GenerateRequest(BaseModel):
    model : str = "gemini-2.5-flash"
    prompt : str
    
    @validator('prompt')
    def injection_detection(cls,v):
        if any(c in v for c in "<>[]"):
            raise ValueError("Illegal Characters Found in Prompt")
        return v
    

class GenerateResponse(BaseModel):
    response : str

class ChatRequest(BaseModel):
    model : str = "gemini-2.5-flash"
    messages : list

class ChatResponse(BaseModel):
    message : dict

class ListModelsResponse(BaseModel):
    models : dict