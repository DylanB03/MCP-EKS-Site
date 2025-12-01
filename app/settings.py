from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class ConfigSettings(BaseSettings):

    model_host : str = Field(...,description="Address for the LLM server")

    model_port : int = Field(...,description="Port for the LLM server")

    model_name : str = Field(...,description="Name of model to pull for LLM")

    email : str = Field(...,description="My email")

    phone : str = Field(..., description="My phone number")

    GEMINI_API_KEY: str = Field(...,description="API Key")

    model_config = SettingsConfigDict(env_file='.env',env_file_encoding="utf-8")

Settings = ConfigSettings()