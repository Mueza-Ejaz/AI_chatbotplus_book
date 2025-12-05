from typing import List, Optional
from enum import Enum
from pydantic import BaseModel, Field

class ChatMode(str, Enum):
    FULL_BOOK = "full_book"
    SELECTED_TEXT = "selected_text"

class ChatRequest(BaseModel):
    query: str = Field(..., description="The user's question for the chatbot.")
    mode: ChatMode = Field(..., description="The query mode (full book or selected text).")
    selected_text: Optional[str] = Field(None, description="Optional. The text selected by the user, required if mode is 'selected_text'.")

class ChatResponse(BaseModel):
    response: str = Field(..., description="The chatbot's answer.")
    sources: List[str] = Field(..., description="List of references from the textbook for the answer.")
