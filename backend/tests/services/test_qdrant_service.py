import os
import pytest
from unittest.mock import MagicMock, patch
from src.services.qdrant_service import QdrantClientService
from qdrant_client import models

# Global pytest fixture to automatically set environment variables for all tests
@pytest.fixture(autouse=True)
def set_env_vars():
    with patch.dict(os.environ, {
        'QDRANT_URL': 'https://3dcdb2f0-31ac-4923-bca9-3983d7a84ce8.us-east4-0.gcp.cloud.qdrant.io',
        'QDRANT_API_KEY': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.CgfIehm405nwmJv-XvhqrQFx2xATwurzYhJhrykOh9U'
    }):
        yield

# Fixture to mock the QdrantClient
@pytest.fixture
def mock_qdrant_client():
    with patch('src.services.qdrant_service.QdrantClient') as mock:
        yield mock

# Fixture to initialize QdrantClientService with mocked client
@pytest.fixture
def qdrant_service(mock_qdrant_client):
    service = QdrantClientService()
    # Ensure that the client instance within the service is the mocked one
    service.client = mock_qdrant_client.return_value
    yield service

# Test QdrantClientService initializes correctly
def test_qdrant_service_init_success(mock_qdrant_client):
    service = QdrantClientService()
    mock_qdrant_client.assert_called_once_with(
        url=os.getenv("QDRANT_URL"),
        api_key=os.getenv("QDRANT_API_KEY")
    )
    assert service.client == mock_qdrant_client.return_value

# Test initialization fails when environment variables are missing
def test_qdrant_service_init_missing_env_vars():
    with patch.dict(os.environ, clear=True):
        with pytest.raises(ValueError, match="QDRANT_URL and QDRANT_API_KEY environment variables must be set."):
            QdrantClientService()

# Test creating a collection
def test_create_collection(qdrant_service):
    collection_name = "test_collection"
    vector_size = 128
    qdrant_service.create_collection(collection_name, vector_size)
    qdrant_service.client.recreate_collection.assert_called_once_with(
        collection_name=collection_name,
        vectors_config=models.VectorParams(size=vector_size, distance=models.Distance.COSINE)
    )

# Test upserting vectors correctly
def test_upsert_vectors(qdrant_service):
    collection_name = "test_collection"
    vectors = [[0.1, 0.2], [0.3, 0.4]]
    payloads = [{"id": 1}, {"id": 2}]
    ids = [1, 2]
    qdrant_service.upsert_vectors(collection_name, vectors, payloads, ids)
    
    expected_points = [
        models.PointStruct(id=1, vector=[0.1, 0.2], payload={"id": 1}),
        models.PointStruct(id=2, vector=[0.3, 0.4], payload={"id": 2}),
    ]
    qdrant_service.client.upsert.assert_called_once()
    args, kwargs = qdrant_service.client.upsert.call_args
    assert kwargs['collection_name'] == collection_name
    assert all(
        p1.id == p2.id and p1.vector == p2.vector and p1.payload == p2.payload 
        for p1, p2 in zip(kwargs['points'], expected_points)
    )

# Test upserting vectors with mismatched ids length
def test_upsert_vectors_mismatched_ids_vectors_length(qdrant_service):
    collection_name = "test_collection"
    vectors = [[0.1, 0.2]]
    payloads = [{"id": 1}]
    ids = [1, 2]  # Mismatched length
    with pytest.raises(ValueError, match="Length of 'ids' must match length of 'vectors' if provided."):
        qdrant_service.upsert_vectors(collection_name, vectors, payloads, ids)

# Test upserting vectors with mismatched payloads length
def test_upsert_vectors_mismatched_payloads_vectors_length(qdrant_service):
    collection_name = "test_collection"
    vectors = [[0.1, 0.2]]
    payloads = [{"id": 1}, {"id": 2}]  # Mismatched length
    with pytest.raises(ValueError, match="Length of 'payloads' must match length of 'vectors'."):
        qdrant_service.upsert_vectors(collection_name, vectors, payloads)

# Test searching vectors
def test_search_vectors(qdrant_service):
    collection_name = "test_collection"
    query_vector = [0.1, 0.2]
    limit = 3
    qdrant_service.client.search.return_value = [
        models.ScoredPoint(id=1, score=0.9, payload={"text": "found"}, version=0), # Added version
    ]
    results = qdrant_service.search_vectors(collection_name, query_vector, limit)
    qdrant_service.client.search.assert_called_once_with(
        collection_name=collection_name,
        query_vector=query_vector,
        query_filter=None,
        limit=limit,
    )
    assert len(results) == 1
    assert results[0].payload["text"] == "found"


