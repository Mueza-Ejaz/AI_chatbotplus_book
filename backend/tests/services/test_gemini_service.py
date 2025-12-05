import pytest
from unittest.mock import MagicMock, patch
from backend.src.services.gemini_service import GeminiService
import os

@pytest.fixture
def mock_genai_configure():
    with patch('google.generativeai.configure') as mock:
        yield mock

@pytest.fixture
def mock_genai_embed_content():
    with patch('google.generativeai.embed_content') as mock:
        yield mock

@pytest.fixture
def mock_genai_generative_model():
    with patch('google.generativeai.GenerativeModel') as mock:
        yield mock

@pytest.fixture
def gemini_service(mock_genai_configure, mock_genai_generative_model):
    with patch.dict(os.environ, {'GEMINI_API_KEY': 'test_gemini_key'}):
        service = GeminiService()
        yield service

def test_gemini_service_init_success(mock_genai_configure, mock_genai_generative_model):
    with patch.dict(os.environ, {'GEMINI_API_KEY': 'test_gemini_key'}):
        service = GeminiService()
        mock_genai_configure.assert_called_once_with(api_key='test_gemini_key')
        mock_genai_generative_model.assert_called_once_with('gemini-pro')
        assert service.model_chat == mock_genai_generative_model.return_value
        assert service.model_embedding == 'models/embedding-001'

def test_gemini_service_init_missing_api_key():
    with patch.dict(os.environ, clear=True):
        with pytest.raises(ValueError, match="GEMINI_API_KEY environment variable must be set."):
            GeminiService()

def test_generate_embeddings(gemini_service, mock_genai_embed_content):
    test_text = "test text for embedding"
    mock_genai_embed_content.return_value = {'embedding': [0.1, 0.2, 0.3]}
    
    embedding = gemini_service.generate_embeddings(test_text)
    
    mock_genai_embed_content.assert_called_once_with(
        model=gemini_service.model_embedding,
        content=test_text,
        task_type="retrieval_query"
    )
    assert embedding == [0.1, 0.2, 0.3]

def test_generate_chat_completion(gemini_service, mock_genai_generative_model):
    test_prompt = "test chat prompt"
    mock_response = MagicMock()
    mock_response.text = "mocked chat response"
    mock_genai_generative_model.return_value.generate_content.return_value = mock_response

    response = gemini_service.generate_chat_completion(test_prompt)

    gemini_service.model_chat.generate_content.assert_called_once_with(test_prompt)
    assert response == "mocked chat response"

def test_generate_content_with_context(gemini_service, mock_genai_generative_model):
    test_prompt = "test chat prompt with context"
    test_history = [{"role": "user", "parts": ["hello"]}]
    mock_chat_session = MagicMock()
    mock_chat_session.send_message.return_value.text = "mocked chat response with context"
    mock_genai_generative_model.return_value.start_chat.return_value = mock_chat_session

    response = gemini_service.generate_content_with_context(test_prompt, test_history)

    gemini_service.model_chat.start_chat.assert_called_once_with(history=test_history)
    mock_chat_session.send_message.assert_called_once_with(test_prompt)
    assert response == "mocked chat response with context"
