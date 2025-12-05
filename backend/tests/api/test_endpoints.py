import pytest
from httpx import AsyncClient
from unittest.mock import AsyncMock, patch
from backend.main import app # Import the main FastAPI app
from backend.src.models.chat import ChatRequest, ChatResponse, ChatMode
from backend.src.models.ingest import IngestRequest, IngestResponse, IngestionStatus

# Fixture for FastAPI TestClient
@pytest.fixture
async def async_client():
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client

# Mock for ChatbotService.process_query
@pytest.fixture
def mock_chatbot_service():
    with patch('backend.src.api.chat.chatbot_service', new_callable=AsyncMock) as mock:
        yield mock

# Mock for IngestionService.process_document
@pytest.fixture
def mock_ingestion_service():
    with patch('backend.src.api.ingest.ingestion_service', new_callable=AsyncMock) as mock:
        yield mock

@pytest.mark.asyncio
async def test_post_chat_query_full_book_success(async_client, mock_chatbot_service):
    chat_request = ChatRequest(query="What is ROS 2?", mode=ChatMode.FULL_BOOK)
    expected_response = ChatResponse(response="ROS 2 is a robotics framework.", sources=["Chapter 1"])
    mock_chatbot_service.process_query.return_value = expected_response

    response = await async_client.post("/chat", json=chat_request.model_dump())

    assert response.status_code == 200
    assert response.json() == expected_response.model_dump()
    mock_chatbot_service.process_query.assert_called_once_with(chat_request)

@pytest.mark.asyncio
async def test_post_chat_query_selected_text_success(async_client, mock_chatbot_service):
    chat_request = ChatRequest(query="Explain nodes.", mode=ChatMode.SELECTED_TEXT, selected_text="Nodes are processes.")
    expected_response = ChatResponse(response="Nodes are computation processes in ROS 2.", sources=["Chapter 2"])
    mock_chatbot_service.process_query.return_value = expected_response

    response = await async_client.post("/chat", json=chat_request.model_dump())

    assert response.status_code == 200
    assert response.json() == expected_response.model_dump()
    mock_chatbot_service.process_query.assert_called_once_with(chat_request)

@pytest.mark.asyncio
async def test_post_chat_query_selected_text_missing_text_failure(async_client):
    chat_request = ChatRequest(query="Explain nodes.", mode=ChatMode.SELECTED_TEXT) # Missing selected_text

    response = await async_client.post("/chat", json=chat_request.model_dump())

    assert response.status_code == 400
    assert "selected_text' is required" in response.json()["detail"]

@pytest.mark.asyncio
async def test_post_chat_query_internal_error(async_client, mock_chatbot_service):
    chat_request = ChatRequest(query="What is ROS 2?", mode=ChatMode.FULL_BOOK)
    mock_chatbot_service.process_query.side_effect = Exception("Internal service error")

    response = await async_client.post("/chat", json=chat_request.model_dump())

    assert response.status_code == 500
    assert "Internal service error" in response.json()["detail"]


@pytest.mark.asyncio
async def test_post_ingest_content_success(async_client, mock_ingestion_service):
    ingest_request = IngestRequest(
        content_id="test-chapter-id",
        text_content="Some test content.",
        metadata={"title": "Test Chapter"}
    )
    expected_response = IngestResponse(status=IngestionStatus.SUCCESS, message="Ingested.")
    mock_ingestion_service.process_document.return_value = expected_response

    response = await async_client.post("/ingest", json=ingest_request.model_dump())

    assert response.status_code == 200
    assert response.json() == expected_response.model_dump()
    mock_ingestion_service.process_document.assert_called_once_with(ingest_request)

@pytest.mark.asyncio
async def test_post_ingest_content_failure(async_client, mock_ingestion_service):
    ingest_request = IngestRequest(
        content_id="test-chapter-id-fail",
        text_content="Some failing content.",
        metadata={"title": "Failing Chapter"}
    )
    expected_response = IngestResponse(status=IngestionStatus.FAILURE, message="Ingestion failed.")
    mock_ingestion_service.process_document.return_value = expected_response

    response = await async_client.post("/ingest", json=ingest_request.model_dump())

    assert response.status_code == 500
    assert response.json()["detail"] == "Ingestion failed."
