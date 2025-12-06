from fastapi import APIRouter, HTTPException, status, Depends
from ..models.ingest import IngestRequest, IngestResponse
from ..services.ingestion_service import IngestionService

router = APIRouter()

# Function to get IngestionService instance, allowing for dependency injection
def get_ingestion_service():
    return IngestionService()

@router.post("/ingest", response_model=IngestResponse)
async def post_ingest_content(
    request: IngestRequest,
    ingestion_service: IngestionService = Depends(get_ingestion_service) # Inject the service
):
    response = await ingestion_service.process_document(request)
    if response.status == "failure":
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=response.message
        )
    return response
