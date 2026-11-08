import os
import json
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ServerSelectionTimeoutError

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGO_DB_NAME", "fighter_forge_db")

client = None
db = None
is_mongo_connected = False

async def connect_db():
    global client, db, is_mongo_connected
    try:
        client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=2000)
        # Verify connection
        await client.admin.command('ping')
        db = client[DB_NAME]
        is_mongo_connected = True
        print(f"✓ Connected to MongoDB at {MONGO_URI}, database: {DB_NAME}")
    except (ServerSelectionTimeoutError, Exception) as e:
        print(f"⚠ MongoDB not reachable ({e}). Using local file storage fallback for enquiries.")
        is_mongo_connected = False

async def close_db():
    global client
    if client:
        client.close()

# Collections
def get_enquiries_collection():
    if is_mongo_connected and db is not None:
        return db["enquiries"]
    return None

def get_custom_quotes_collection():
    if is_mongo_connected and db is not None:
        return db["custom_quotes"]
    return None

def get_gear_ideas_collection():
    if is_mongo_connected and db is not None:
        return db["gear_ideas"]
    return None

def get_rentals_collection():
    if is_mongo_connected and db is not None:
        return db["rentals"]
    return None

# File Storage Fallback Helper
FALLBACK_DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
os.makedirs(FALLBACK_DATA_DIR, exist_ok=True)

def append_to_json_file(filename: str, record: dict):
    filepath = os.path.join(FALLBACK_DATA_DIR, filename)
    data = []
    if os.path.exists(filepath):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception:
            data = []
    data.append(record)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
