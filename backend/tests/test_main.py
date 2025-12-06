import os
import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch

from main import app
from src.api.chat import get_chatbot_service # Import the dependency function
from src.api.ingest import get_ingestion_service # Import the dependency function for IngestionService
from src.services.chatbot_service import ChatbotService # Import for spec
from src.services.ingestion_service import IngestionService # Import for spec

# Fixture to mock ChatbotService for test_main.py
@pytest.fixture
def mock_chatbot_service_for_main():
    return MagicMock(spec=ChatbotService)

# Fixture to mock IngestionService for test_main.py
@pytest.fixture
def mock_ingestion_service_for_main():
    return MagicMock(spec=IngestionService)

def test_read_root(mock_chatbot_service_for_main, mock_ingestion_service_for_main):
    # Override the dependency before creating the TestClient
    app.dependency_overrides[get_chatbot_service] = lambda: mock_chatbot_service_for_main
    app.dependency_overrides[get_ingestion_service] = lambda: mock_ingestion_service_for_main # Override IngestionService
    client = TestClient(app)
    
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "FastAPI backend is running!"}
    
    # Clean up overrides after test
    app.dependency_overrides = {}
