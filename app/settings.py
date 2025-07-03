from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):

    host : str = Field(...,description="Host address for uvicorn server")

    port : int = Field(...,descriptoin="Port for uvicorn server")


