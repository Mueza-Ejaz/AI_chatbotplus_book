import pytest
from unittest.mock import MagicMock, patch
from backend.src.services.qdrant_service import QdrantClientService
from qdrant_client import models

@pytest.fixture
def mock_qdrant_client():
    with patch('qdrant_client.QdrantClient') as mock:
        yield mock

@pytest.fixture
def qdrant_service(mock_qdrant_client):
    # Mock environment variables for QdrantClientService
    with patch.dict(os.environ, {'QDRANT_URL': 'http://mock-qdrant:6333', 'QDRANT_API_KEY': 'mock-key'}):
        service = QdrantClientService()
        # Ensure that the client instance within the service is the mocked one
        service.client = mock_qdrant_client.return_value
        yield service

def test_qdrant_service_init_success(mock_qdrant_client):
    with patch.dict(os.environ, {'QDRANT_URL': 'http://test:6333', 'QDRANT_API_KEY': 'test-key'}):
        service = QdrantClientService()
        mock_qdrant_client.assert_called_once_with(url='http://test:6333', api_key='test-key')
        assert service.client == mock_qdrant_client.return_value

def test_qdrant_service_init_missing_env_vars():
    with patch.dict(os.environ, clear=True):
        with pytest.raises(ValueError, match="QDRANT_URL and QDRANT_API_KEY environment variables must be set."):
            QdrantClientService()

def test_create_collection(qdrant_service):
    collection_name = "test_collection"
    vector_size = 128
    qdrant_service.create_collection(collection_name, vector_size)
    qdrant_service.client.recreate_collection.assert_called_once_with(
        collection_name=collection_name,
        vectors_config=models.VectorParams(size=vector_size, distance=models.Distance.COSINE)
    )

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
    assert all(p1.id == p2.id and p1.vector == p2.vector and p1.payload == p2.payload for p1, p2 in zip(kwargs['points'], expected_points))


def test_upsert_vectors_mismatched_ids_vectors_length(qdrant_service):
    collection_name = "test_collection"
    vectors = [[0.1, 0.2]]
    payloads = [{"id": 1}]
    ids = [1, 2] # Mismatched length
    with pytest.raises(ValueError, match="Length of 'ids' must match length of 'vectors' if provided."):
        qdrant_service.upsert_vectors(collection_name, vectors, payloads, ids)

def test_upsert_vectors_mismatched_payloads_vectors_length(qdrant_service):
    collection_name = "test_collection"
    vectors = [[0.1, 0.2]]
    payloads = [{"id": 1}, {"id": 2}] # Mismatched length
    with pytest.raises(ValueError, match="Length of 'payloads' must match length of 'vectors'."):
        qdrant_service.upsert_vectors(collection_name, vectors, payloads)


def test_search_vectors(qdrant_service):
    collection_name = "test_collection"
    query_vector = [0.1, 0.2]
    limit = 3
    qdrant_service.client.search.return_value = [
        models.ScoredPoint(id=1, score=0.9, payload={"text": "found"}),
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
