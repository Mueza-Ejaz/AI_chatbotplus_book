import os
from typing import List
import google.generativeai as genai

class GeminiService:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY environment variable must be set.")
        genai.configure(api_key=self.api_key)

        # Initialize the generative model for chat completions
        self.model_chat = genai.GenerativeModel('gemini-pro') # Using gemini-pro for chat

        # Initialize the embedding model for embeddings
        self.model_embedding = 'models/embedding-001' # Using embedding-001 for embeddings

    def generate_embeddings(self, text: str) -> List[float]:
        """
        Generates embeddings for a given text.
        """
        response = genai.embed_content(
            model=self.model_embedding,
            content=text,
            task_type="retrieval_query" # Or "retrieval_document" depending on usage
        )
        return response['embedding']

    def generate_chat_completion(self, prompt: str) -> str:
        """
        Generates a chat completion for a given prompt.
        """
        response = self.model_chat.generate_content(prompt)
        return response.text

    def generate_content_with_context(self, prompt: str, history: List[dict] = None) -> str:
        """
        Generates a chat completion with conversational history.
        """
        chat = self.model_chat.start_chat(history=history or [])
        response = chat.send_message(prompt)
        return response.text

# Example usage (for testing purposes, run this file directly)
if __name__ == "__main__":
    # Set a dummy API key for local testing
    os.environ["GEMINI_API_KEY"] = "YOUR_GEMINI_API_KEY" # Replace with a real key for actual use

    try:
        gemini_service = GeminiService()

        # Test embedding generation
        text_to_embed = "Hello, world!"
        embedding = gemini_service.generate_embeddings(text_to_embed)
        print(f"Embedding for '{text_to_embed}': {embedding[:5]}...") # Print first 5 elements

        # Test chat completion
        chat_prompt = "What is the capital of France?"
        chat_response = gemini_service.generate_chat_completion(chat_prompt)
        print(f"Chat response for '{chat_prompt}': {chat_response}")

        # Test chat completion with history
        chat_history = [
            {"role": "user", "parts": ["Hi!"]},
            {"role": "model", "parts": ["Hello there! How can I help you today?"]},
        ]
        chat_response_with_history = gemini_service.generate_content_with_context(
            "What is your favorite color?", chat_history
        )
        print(f"Chat response with history: {chat_response_with_history}")

    except ValueError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
