import os
import json
import uuid
import shutil
from typing import List
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .database import (
    connect_db, close_db, is_mongo_connected,
    get_enquiries_collection, get_custom_quotes_collection, get_gear_ideas_collection,
    get_rentals_collection,
    append_to_json_file
)
from .models import CartEnquiry, CustomBuildEnquiry, GearIdea

app = FastAPI(
    title="Fighter Forge Arena API",
    description="Backend API for Fighter Forge Boxing Rings & MMA Cages Enquiries",
    version="1.0.0"
)

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Uploads directory
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.on_event("startup")
async def startup():
    await connect_db()

@app.on_event("shutdown")
async def shutdown():
    await close_db()

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "brand": "FIGHTER FORGE",
        "mongo_connected": is_mongo_connected
    }

# 1. Save Cart Enquiry
@app.post("/api/enquiries")
async def create_cart_enquiry(enquiry: CartEnquiry):
    record = enquiry.dict()
    record["id"] = str(uuid.uuid4())
    
    col = get_enquiries_collection()
    if col is not None:
        try:
            await col.insert_one(record)
            # Remove ObjectId before returning
            record.pop("_id", None)
            return {"success": True, "source": "mongodb", "enquiry": record}
        except Exception as e:
            print("MongoDB insert error:", e)

    # Fallback to local JSON store
    append_to_json_file("enquiries.json", record)
    return {"success": True, "source": "local_storage", "enquiry": record}

# 2. Get All Cart Enquiries
@app.get("/api/enquiries")
async def list_enquiries():
    col = get_enquiries_collection()
    if col is not None:
        try:
            cursor = col.find({}, {"_id": 0})
            items = await cursor.to_list(length=100)
            return {"enquiries": items}
        except Exception as e:
            print("MongoDB read error:", e)

    filepath = os.path.join(os.path.dirname(__file__), "data", "enquiries.json")
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return {"enquiries": json.load(f)}
    return {"enquiries": []}

# 3. Save Custom Build Enquiry with Photo Upload
@app.post("/api/custom-enquiry")
async def create_custom_enquiry(
    type: str = Form(...),
    specs: str = Form(...),
    customer: str = Form(...),
    photos: List[UploadFile] = File([])
):
    try:
        specs_data = json.loads(specs)
        customer_data = json.loads(customer)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON in form fields: {e}")

    uploaded_urls = []
    for photo in photos:
        ext = os.path.splitext(photo.filename)[1]
        unique_name = f"{uuid.uuid4().hex[:8]}_{photo.filename}"
        dest_path = os.path.join(UPLOAD_DIR, unique_name)
        with open(dest_path, "wb") as buffer:
            shutil.copyfileobj(photo.file, buffer)
        uploaded_urls.append(f"/uploads/{unique_name}")

    record = {
        "id": str(uuid.uuid4()),
        "type": type,
        "specs": specs_data,
        "customer": customer_data,
        "uploadedUrls": uploaded_urls
    }

    col = get_custom_quotes_collection()
    if col is not None:
        try:
            await col.insert_one(record)
            record.pop("_id", None)
            return {"success": True, "source": "mongodb", "uploadedUrls": uploaded_urls, "data": record}
        except Exception as e:
            print("MongoDB error:", e)

    append_to_json_file("custom_quotes.json", record)
    return {"success": True, "source": "local_storage", "uploadedUrls": uploaded_urls, "data": record}

# 4. Save Gear Ideas
@app.post("/api/gear-ideas")
async def save_gear_idea(gear: GearIdea):
    record = gear.dict()
    record["id"] = str(uuid.uuid4())
    col = get_gear_ideas_collection()
    if col is not None:
        try:
            await col.insert_one(record)
            record.pop("_id", None)
            return {"success": True, "source": "mongodb"}
        except Exception as e:
            print("MongoDB error:", e)
    append_to_json_file("gear_ideas.json", record)
    return {"success": True, "source": "local_storage"}

# 5. Save Event Rental Enquiry
@app.post("/api/rentals")
async def create_rental_enquiry(rental: dict):
    rental["id"] = str(uuid.uuid4())
    col = get_rentals_collection()
    if col is not None:
        try:
            await col.insert_one(rental)
            rental.pop("_id", None)
            return {"success": True, "source": "mongodb", "rental": rental}
        except Exception as e:
            print("MongoDB rental insert error:", e)

    append_to_json_file("rentals.json", rental)
    return {"success": True, "source": "local_storage", "rental": rental}

@app.get("/api/rentals")
async def list_rentals():
    col = get_rentals_collection()
    if col is not None:
        try:
            cursor = col.find({}, {"_id": 0})
            items = await cursor.to_list(length=100)
            return {"rentals": items}
        except Exception as e:
            print("MongoDB read error:", e)

    filepath = os.path.join(os.path.dirname(__file__), "data", "rentals.json")
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return {"rentals": json.load(f)}
    return {"rentals": []}
