# Quickstart Guide: Physical AI & Humanoid Robotics Textbook

This guide provides instructions to quickly set up and run the Physical AI & Humanoid Robotics Textbook project.

## Prerequisites

*   Node.js (LTS version)
*   Python 3.11+
*   npm or yarn (for frontend dependencies)
*   pip or poetry (for backend dependencies)
*   Git

## 1. Clone the Repository

```bash
git clone [REPOSITORY_URL]
cd [REPOSITORY_NAME]
```

## 2. Frontend Setup (Docusaurus)

Navigate to the `frontend/` directory and install dependencies:

```bash
cd frontend
npm install # or yarn install
```

## 3. Backend Setup (FastAPI Chatbot)

Navigate to the `backend/` directory and install dependencies. It is recommended to use a virtual environment.

```bash
cd backend
python -m venv venv
./venv/Scripts/activate # On Windows
source venv/bin/activate # On macOS/Linux
pip install -r requirements.txt # Assuming requirements.txt will be generated
```

You will need to set up environment variables for the backend:

*   `GEMINI_API_KEY`: Your Gemini API Key.
*   `QDRANT_URL`: URL for your Qdrant Cloud instance.
*   `QDRANT_API_KEY`: API key for your Qdrant Cloud instance.
*   `NEON_POSTGRES_URL`: Connection URL for your Neon Serverless Postgres database.

Create a `.env` file in the `backend/` directory with these variables.

## 4. Run the Project

### Start Frontend (Docusaurus)

```bash
cd frontend
npm start # or yarn start
```

The Docusaurus site will be available at `http://localhost:3000`.

### Start Backend (FastAPI)

```bash
cd backend
./venv/Scripts/activate # On Windows
source venv/bin/activate # On macOS/Linux
uvicorn main:app --reload # Assuming main.py is the entry point
```

The FastAPI backend will be available at `http://localhost:8000`.

## 5. Ingest Textbook Content (Chatbot)

Before using the chatbot, you will need to ingest the textbook content into Qdrant. This process will involve running a script or accessing an endpoint that reads the textbook markdown files, generates embeddings, and stores them in Qdrant.

```bash
# Example (details to be determined during implementation)
python scripts/ingest_content.py --path ../frontend/docs
```

## 6. Access the Chatbot

Once both frontend and backend are running, the chatbot should be accessible via the floating chat button on the Docusaurus site.
