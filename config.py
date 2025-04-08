import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

class Config:
    # Sandbox API settings
    SANDBOX_API_KEY = os.getenv('SANDBOX_API_KEY')
    SANDBOX_BASE_URL = "https://api.storecove.com/api/v2"
    
    # Production API settings
    PRODUCTION_API_KEY = os.getenv('PRODUCTION_API_KEY')
    PRODUCTION_BASE_URL = "https://api.storecove.com/api/v2"
    
    DEBUG = True