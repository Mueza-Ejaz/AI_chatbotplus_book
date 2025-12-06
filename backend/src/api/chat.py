from fastapi import APIRouter, HTTPException, status, Depends
from ..models.chat import ChatRequest, ChatResponse, ChatMode
from ..services.chatbot_service import ChatbotService

router = APIRouter()

# Function to get ChatbotService instance, allowing for dependency injection
def get_chatbot_service():
    return ChatbotService()

@router.post("/chat", response_model=ChatResponse)
async def post_chat_query(
    request: ChatRequest,
    chatbot_service: ChatbotService = Depends(get_chatbot_service) # Inject the service
):
    if request.mode == ChatMode.SELECTED_TEXT and not request.selected_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="'selected_text' is required when mode is 'selected_text'."
        )
    
    try:
        response = chatbot_service.process_query(request)
        return response
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while processing the chat query: {e}"
        )
