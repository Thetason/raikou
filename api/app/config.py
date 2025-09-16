import os


API_TITLE = os.getenv("API_TITLE", "라이코 API")
DATABASE_URL = os.getenv("DATABASE_URL")
OFFLINE_MODE = os.getenv("OFFLINE_MODE", "true").lower() in ("1","true","yes")

