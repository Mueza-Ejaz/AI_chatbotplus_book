# Quickstart: Physical AI & Humanoid Robotics Textbook

This guide provides instructions to set up and run the "Physical AI & Humanoid Robotics Textbook" project locally.

## Prerequisites

Ensure you have the following installed on your system:

-   **Node.js** (LTS version, e.g., 18.x or 20.x) and **npm** or **yarn**
-   **Python 3.9+** and **pip**
-   **Git**

## 1. Clone the Repository

```bash
git clone <repository-url>
cd physical-ai-textbook
```

## 2. Environment Variables

Create a `.env` file in the `backend/` directory with the following content:

```
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
QDRANT_URL="YOUR_QDRANT_CLOUD_URL"
QDRANT_API_KEY="YOUR_QDRANT_CLOUD_API_KEY"
DATABASE_URL="YOUR_NEON_SERVERLESS_POSTGRES_URL"
```

-   Obtain a Gemini API Key from the Google AI Studio.
-   Set up a free-tier Qdrant Cloud instance and get its URL and API Key.
-   Set up a Neon Serverless Postgres database and get its connection URL.

## 3. Frontend Setup (Docusaurus)

```bash
cd frontend
npm install # or yarn install
npm start   # or yarn start
```

This will start the Docusaurus development server, typically at `http://localhost:3000`.

## 4. Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
./venv/Scripts/activate # On Windows
source venv/bin/activate # On macOS/Linux

pip install -r requirements.txt # You will need to create this file
uvicorn main:app --reload
```

This will start the FastAPI development server, typically at `http://localhost:8000`.

*(Note: `requirements.txt` needs to be created, listing `fastapi`, `uvicorn`, `openai`, `qdrant-client`, `psycopg2-binary` or `asyncpg`, `python-dotenv`.)*

## 5. Using the Chatbot

Once both the frontend and backend are running:

1.  Navigate to the textbook in your browser (`http://localhost:3000`).
2.  Interact with the floating chatbot widget.
3.  You can ask questions about the textbook content (Full Book Query mode).
4.  You can select text on any page and use the chatbot to get explanations or elaborations on the selected text (Selected Text Query mode).

## 6. Initializing Databases (Optional, for content loading)

If you need to load the initial textbook content into Qdrant and your PostgreSQL database, you will need a separate script (not provided in this quickstart, but will be part of the full implementation).

```bash
# Example command (actual command will be provided during implementation)
python scripts/load_textbook_content.py
```

This will parse the markdown files from `frontend/docs/`, generate embeddings, and store them in Qdrant, and potentially metadata in PostgreSQL.
