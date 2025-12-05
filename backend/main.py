from fastapi import FastAPI
from backend.src.api import health, chat, ingest

app = FastAPI()

app.include_router(health.router)
app.include_router(chat.router)
app.include_router(ingest.router)

@app.get("/")
async def root():
    return {"message": "FastAPI backend is running!"}
