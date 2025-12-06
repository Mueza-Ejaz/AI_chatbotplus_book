from typing import List, Dict, Any
import os

from .qdrant_service import QdrantClientService
from .gemini_service import GeminiService
from ..models.chat import ChatRequest, ChatResponse, ChatMode

class ChatbotService:
    def __init__(self):
        self.qdrant_service = QdrantClientService()
        self.gemini_service = GeminiService()
        self.collection_name = os.getenv("QDRANT_COLLECTION_NAME", "textbook_chapters")
        self.embedding_size = int(os.getenv("EMBEDDING_SIZE", 768)) # Default embedding size, adjust if necessary

        # Ensure the Qdrant collection exists (can be done during ingestion normally)
        # For simplicity, we'll try to create it here if it doesn't exist.
        # In a real application, collection creation should be part of an ingestion pipeline.
        try:
            # Check if collection exists
            self.qdrant_service.client.get_collection(collection_name=self.collection_name)
        except Exception: # Collection does not exist
            print(f"Collection '{self.collection_name}' not found, creating it.")
            self.qdrant_service.create_collection(self.collection_name, self.embedding_size)


    def _get_context_from_qdrant(self, query: str, limit: int = 3) -> List[Dict[str, Any]]:
        """
        Retrieves relevant context from Qdrant based on the query.
        """
        query_embedding = self.gemini_service.generate_embeddings(query)
        search_results = self.qdrant_service.search_vectors(
            collection_name=self.collection_name,
            query_vector=query_embedding,
            limit=limit,
        )

        context = []
        for hit in search_results:
            context.append(hit.payload)
        return context

    def process_query(self, request: ChatRequest) -> ChatResponse:
        """
        Processes a user query and returns a chatbot response with source attribution.
        """
        context_text = ""
        sources = []

        if request.mode == ChatMode.FULL_BOOK:
            relevant_docs = self._get_context_from_qdrant(request.query)
            for doc in relevant_docs:
                context_text += f"Content from {doc.get('chapter_title', 'unknown')}:\n{doc.get('text_content', '')}\n\n"
                sources.append(doc.get('chapter_title', 'unknown')) # Use a more detailed source in production

            prompt = (
                f"You are a helpful assistant for a textbook on Physical AI & Humanoid Robotics.\n"
                f"Answer the following question based ONLY on the provided context.\n"
                f"If the answer is not in the context, state that you cannot answer from the provided information.\n\n"
                f"Context:\n{context_text}\n\n"
                f"Question: {request.query}\n"
                f"Answer:"
            )
        elif request.mode == ChatMode.SELECTED_TEXT:
            if not request.selected_text:
                return ChatResponse(response="Please provide selected text for this query mode.", sources=[])
            
            context_text = request.selected_text
            prompt = (
                f"You are a helpful assistant for a textbook on Physical AI & Humanoid Robotics.\n"
                f"Answer the following question based ONLY on the PROVIDED SELECTED TEXT.\n"
                f"If the answer is not in the selected text, state that you cannot answer from the provided information.\n\n"
                f"Selected Text:\n{context_text}\n\n"
                f"Question: {request.query}\n"
                f"Answer:"
            )
        else:
            return ChatResponse(response="Invalid chat mode.", sources=[])

        try:
            response_text = self.gemini_service.generate_chat_completion(prompt)
        except Exception as e:
            print(f"Error generating chat completion: {e}")
            response_text = "I'm sorry, I encountered an error while processing your request."

        return ChatResponse(response=response_text, sources=list(set(sources))) # Remove duplicate sources

# Example usage (for testing purposes, requires Qdrant and Gemini setup)
if __name__ == "__main__":
    os.environ["QDRANT_URL"] = "https://3dcdb2f0-31ac-4923-bca9-3983d7a84ce8.us-east4-0.gcp.cloud.qdrant.io"
    os.environ["QDRANT_API_KEY"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.CgfIehm405nwmJv-XvhqrQFx2xATwurzYhJhrykOh9U"
    os.environ["GEMINI_API_KEY"] = "AIzaSyCYktNxdWlPAtw2kjYRxTdcQ7HmCt5KiDs"
    os.environ["QDRANT_COLLECTION_NAME"] = "test_textbook_chapters"
    os.environ["EMBEDDING_SIZE"] = "768" 

    # Dummy Qdrant client service (replace with actual QdrantClientService for real test)
    class MockQdrantClientService:
        def __init__(self):
            self.client = type('MockClient', (object,), {'get_collection': lambda self, collection_name: None, 'recreate_collection': lambda self, collection_name, vectors_config: None, 'upsert': lambda self, collection_name, points: None})()
        def search_vectors(self, collection_name: str, query_vector: List[float], limit: int = 5, query_filter=None) -> List[Any]:
            # Mock search results
            return [
                models.ScoredPoint(id=1, score=0.9, payload={"chapter_title": "Module 1, Chapter 1", "text_content": "ROS 2 is a flexible framework for writing robot software."}),
                models.ScoredPoint(id=2, score=0.8, payload={"chapter_title": "Module 1, Chapter 2", "text_content": "Nodes are processes that perform computation."})
            ]
    
    # Dummy Gemini service (replace with actual GeminiService for real test)
    class MockGeminiService:
        def generate_embeddings(self, text: str) -> List[float]:
            return [0.1] * int(os.getenv("EMBEDDING_SIZE", 768)) # Dummy embedding
        def generate_chat_completion(self, prompt: str) -> str:
            if "ROS 2 is" in prompt:
                return "ROS 2 is a flexible framework for writing robot software, as mentioned in Module 1, Chapter 1."
            return "Mocked response: I cannot answer that question based on the provided information."

    # Temporarily replace real services with mocks for example
    # ChatbotService.qdrant_service = MockQdrantClientService()
    # ChatbotService.gemini_service = MockGeminiService()

    chatbot_service = ChatbotService()
    
    # Test FULL_BOOK mode
    print("Testing FULL_BOOK mode:")
    chat_request_full_book = ChatRequest(query="What is ROS 2?", mode=ChatMode.FULL_BOOK)
    chat_response_full_book = chatbot_service.process_query(chat_request_full_book)
    print("Response:", chat_response_full_book.response)
    print("Sources:", chat_response_full_book.sources)

    # Test SELECTED_TEXT mode
    print("\nTesting SELECTED_TEXT mode:")
    selected_text_content = "Nodes in ROS 2 are processes that perform computation."
    chat_request_selected_text = ChatRequest(query="What are nodes in ROS 2?", mode=ChatMode.SELECTED_TEXT, selected_text=selected_text_content)
    chat_response_selected_text = chatbot_service.process_query(chat_request_selected_text)
    print("Response:", chat_response_selected_text.response)
    print("Sources:", chat_response_selected_text.sources)

    # Test case where selected text is missing for SELECTED_TEXT mode
    print("\nTesting SELECTED_TEXT mode with missing text:")
    chat_request_missing_text = ChatRequest(query="What are nodes?", mode=ChatMode.SELECTED_TEXT)
    chat_response_missing_text = chatbot_service.process_query(chat_request_missing_text)
    print("Response:", chat_response_missing_text.response)
    print("Sources:", chat_response_missing_text.sources)


