import os
import argparse
import httpx
import frontmatter
from typing import Dict, Any, List

# Assuming these models are accessible or defined similarly in the script's context
from backend.src.models.ingest import IngestRequest, IngestResponse

# FastAPI server URL (assuming it's running locally for ingestion)
FASTAPI_URL = os.getenv("FASTAPI_URL", "http://localhost:8000")

async def ingest_file(file_path: str, client: httpx.AsyncClient, base_path: str):
    """
    Reads a markdown file, extracts content and metadata, and sends it to the ingestion API.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            post = frontmatter.load(f)

        content_id = os.path.relpath(file_path, base_path).replace("\", "/").replace(".mdx", "").replace(".md", "")
        text_content = post.content
        metadata = post.metadata

        # Add some useful metadata
        metadata["file_path"] = os.path.relpath(file_path, os.getcwd()).replace("\", "/")
        metadata["chapter_title"] = post.get("title", content_id.split('/')[-1])
        
        # Determine module and chapter from path
        path_parts = content_id.split('/')
        if len(path_parts) >= 2 and path_parts[-2].startswith("module-"):
            metadata["module"] = path_parts[-2].replace("-", " ").title()
            metadata["chapter"] = path_parts[-1].replace("-", " ").title()


        ingest_request = IngestRequest(
            content_id=content_id,
            text_content=text_content,
            metadata=metadata
        )

        response = await client.post(f"{FASTAPI_URL}/ingest", json=ingest_request.model_dump())
        response.raise_for_status()
        
        ingest_response = IngestResponse(**response.json())
        if ingest_response.status == IngestionStatus.SUCCESS:
            print(f"Successfully ingested {content_id}: {ingest_response.message}")
        else:
            print(f"Failed to ingest {content_id}: {ingest_response.message}")

    except httpx.HTTPStatusError as e:
        print(f"HTTP error ingesting {file_path}: {e.response.status_code} - {e.response.text}")
    except Exception as e:
        print(f"Error ingesting {file_path}: {e}")

async def main():
    parser = argparse.ArgumentParser(description="Ingest Docusaurus markdown files into FastAPI backend.")
    parser.add_argument(
        "docs_path",
        type=str,
        help="Path to the Docusaurus docs directory (e.g., frontend/frontend/docs)",
    )
    args = parser.parse_args()

    docs_directory = args.docs_path
    if not os.path.isdir(docs_directory):
        print(f"Error: Directory not found at {docs_directory}")
        return

    print(f"Starting ingestion from: {docs_directory}")

    # Use httpx.AsyncClient for asynchronous requests
    async with httpx.AsyncClient(timeout=None) as client:
        for root, _, files in os.walk(docs_directory):
            for file in files:
                if file.endswith((".md", ".mdx")):
                    file_path = os.path.join(root, file)
                    await ingest_file(file_path, client, docs_directory)
    print("Ingestion process completed.")

if __name__ == "__main__":
    import asyncio
    # Need to install python-frontmatter and httpx
    # pip install python-frontmatter httpx
    asyncio.run(main())
