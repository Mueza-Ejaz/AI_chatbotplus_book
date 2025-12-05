from typing import Any, Dict
from enum import Enum
from pydantic import BaseModel, Field

class IngestionStatus(str, Enum):
    SUCCESS = "success"
    FAILURE = "failure"

class IngestRequest(BaseModel):
    content_id: str = Field(..., description="Unique ID for the content being ingested (e.g., chapter ID).")
    text_content: str = Field(..., description="The text content to be embedded and stored.")
    metadata: Dict[str, Any] = Field(..., description="Any associated metadata (e.g., chapter title, module, page number).")

class IngestResponse(BaseModel):
    status: IngestionStatus = Field(..., description="Status of the ingestion.")
    message: str = Field(..., description="Details about the ingestion process.")
