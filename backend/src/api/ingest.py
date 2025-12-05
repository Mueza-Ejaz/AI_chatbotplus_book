from fastapi import APIRouter, HTTPException, status
from backend.src.models.ingest import IngestRequest, IngestResponse
from backend.src.services.ingestion_service import IngestionService

router = APIRouter()
ingestion_service = IngestionService()

@router.post("/ingest", response_model=IngestResponse)
async def post_ingest_content(request: IngestRequest):
    response = await ingestion_service.process_document(request)
    if response.status == "failure":
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=response.message
        )
    return response
