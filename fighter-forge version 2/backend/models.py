from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field
from datetime import datetime

class CustomerInfo(BaseModel):
    name: str
    phone: str
    city: str
    notes: Optional[str] = ""

class CartItemModel(BaseModel):
    cartId: Optional[str] = None
    id: str
    name: str
    category: Optional[str] = None
    image: Optional[str] = None
    selectedSize: Optional[str] = None
    selectedHeight: Optional[str] = None
    selectedShape: Optional[str] = None
    quantity: int = 1
    priceNumeric: Optional[float] = None

class CartEnquiry(BaseModel):
    items: List[CartItemModel]
    customer: CustomerInfo
    subtotal: Optional[float] = 0.0
    createdAt: Optional[str] = Field(default_factory=lambda: datetime.utcnow().isoformat())

class CustomBuildEnquiry(BaseModel):
    type: str # 'ring' or 'cage'
    specs: Dict[str, Any]
    customer: CustomerInfo
    uploadedUrls: List[str] = []
    createdAt: Optional[str] = Field(default_factory=lambda: datetime.utcnow().isoformat())

class GearIdea(BaseModel):
    gearCategory: str
    name: str
    phone: str
    city: Optional[str] = ""
    idea: str
    createdAt: Optional[str] = Field(default_factory=lambda: datetime.utcnow().isoformat())
