import os
from qdrant_client import QdrantClient, models
from typing import List, Dict, Any, Optional

class QdrantClientService:
    def __init__(self):
        self.qdrant_url = os.getenv("QDRANT_URL")
        self.qdrant_api_key = os.getenv("QDRANT_API_KEY")

        if not self.qdrant_url or not self.qdrant_api_key:
            raise ValueError("QDRANT_URL and QDRANT_API_KEY environment variables must be set.")

        self.client = QdrantClient(
            url=self.qdrant_url,
            api_key=self.qdrant_api_key,
        )

    def create_collection(self, collection_name: str, vector_size: int, distance: models.Distance = models.Distance.COSINE):
        """
        Creates a new collection in Qdrant.
        """
        self.client.recreate_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(size=vector_size, distance=distance),
        )
        print(f"Collection '{collection_name}' created or recreated.")

    def upsert_vectors(self, collection_name: str, vectors: List[List[float]], payloads: List[Dict[str, Any]], ids: Optional[List[int]] = None):
        """
        Upserts (inserts or updates) vectors and their payloads into a collection.
        """
        if ids and len(ids) != len(vectors):
            raise ValueError("Length of 'ids' must match length of 'vectors' if provided.")
        if len(payloads) != len(vectors):
            raise ValueError("Length of 'payloads' must match length of 'vectors'.")

        points = []
        for i, (vector, payload) in enumerate(zip(vectors, payloads)):
            point_id = ids[i] if ids else None
            points.append(models.PointStruct(id=point_id, vector=vector, payload=payload))

        self.client.upsert(
            collection_name=collection_name,
            points=points,
        )
        print(f"Upserted {len(vectors)} vectors into collection '{collection_name}'.")

    def search_vectors(self, collection_name: str, query_vector: List[float], limit: int = 5, query_filter: Optional[models.Filter] = None) -> List[models.ScoredPoint]:
        """
        Searches for similar vectors in a collection.
        """
        search_result = self.client.search(
            collection_name=collection_name,
            query_vector=query_vector,
            query_filter=query_filter,
            limit=limit,
        )
        return search_result

if __name__ == "__main__":
    # This block is for testing the service independently
    # Set dummy environment variables for local testing (replace with your actual values)
    os.environ["QDRANT_URL"] = "http://localhost:6333" # Or your Qdrant Cloud URL
    os.environ["QDRANT_API_KEY"] = "your_api_key" # Or your Qdrant Cloud API key

    qdrant_service = QdrantClientService()
    collection_name = "test_collection"
    vector_size = 4 # Example vector size

    try:
        qdrant_service.create_collection(collection_name, vector_size)

        vectors = [[0.1, 0.2, 0.3, 0.4], [0.5, 0.6, 0.7, 0.8]]
        payloads = [{"text": "hello world"}, {"text": "fastapi qdrant"}]
        qdrant_service.upsert_vectors(collection_name, vectors, payloads)

        query_vector = [0.15, 0.25, 0.35, 0.45]
        search_results = qdrant_service.search_vectors(collection_name, query_vector)
        print("Search Results:", search_results)

    except ValueError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
