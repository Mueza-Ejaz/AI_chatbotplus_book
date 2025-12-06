from typing import Dict, Any, List
import os

from .gemini_service import GeminiService
from .qdrant_service import QdrantClientService
from ..models.ingest import IngestRequest, IngestResponse, IngestionStatus

class IngestionService:
    def __init__(self):
        self.gemini_service = GeminiService()
        self.qdrant_service = QdrantClientService()
        self.collection_name = os.getenv("QDRANT_COLLECTION_NAME", "textbook_chapters")
        self.embedding_size = int(os.getenv("EMBEDDING_SIZE", 768))

        # Ensure collection exists
        try:
            self.qdrant_service.client.get_collection(collection_name=self.collection_name)
        except Exception:
            print(f"Collection '{self.collection_name}' not found during ingestion init, creating it.")
            self.qdrant_service.create_collection(self.collection_name, self.embedding_size)

    async def process_document(self, request: IngestRequest) -> IngestResponse:
        """
        Processes a single document: generates embeddings and stores in Qdrant.
        """
        try:
            # 1. Generate embeddings
            embedding = self.gemini_service.generate_embeddings(request.text_content)

            # 2. Prepare payload
            payload = {
                "content_id": request.content_id,
                "text_content": request.text_content,
                **request.metadata
            }

            # 3. Store in Qdrant
            self.qdrant_service.upsert_vectors(
                collection_name=self.collection_name,
                vectors=[embedding],
                payloads=[payload],
                ids=[hash(request.content_id) % (2**63 - 1)] # Simple hash for ID for now
            )

            return IngestResponse(status=IngestionStatus.SUCCESS, message=f"Document '{request.content_id}' ingested successfully.")
        except Exception as e:
            return IngestResponse(status=IngestionStatus.FAILURE, message=f"Failed to ingest document '{request.content_id}': {e}")

# Example usage (for testing purposes)
if __name__ == "__main__":
    os.environ["GEMINI_API_KEY"] = "YOUR_GEMINI_API_KEY"
    os.environ["QDRANT_URL"] = "http://localhost:6333"
    os.environ["QDRANT_API_KEY"] = "YOUR_QDRANT_API_KEY"
    os.environ["QDRANT_COLLECTION_NAME"] = "test_ingestion_chapters"
    os.environ["EMBEDDING_SIZE"] = "768"

    ingestion_service = IngestionService()

    # Create a dummy request
    dummy_request = IngestRequest(
        content_id="chapter-1",
        text_content="This is the content of chapter 1 about ROS 2 architecture.",
        metadata={"chapter_title": "ROS 2 Architecture", "module": "Module 1"}
    )

    response = ingestion_service.process_document(dummy_request)
    print(f"Ingestion response: {response.status} - {response.message}")
