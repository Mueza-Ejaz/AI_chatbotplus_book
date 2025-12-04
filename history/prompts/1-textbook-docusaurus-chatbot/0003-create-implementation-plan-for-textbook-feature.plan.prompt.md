---
id: 0003
title: Create implementation plan for textbook feature
stage: plan
date: 2025-12-04
surface: agent
model: gemini-pro
feature: 1-textbook-docusaurus-chatbot
branch: 1-textbook-docusaurus-chatbot
user: CLI User
command: /sp.plan The technical implementation plan for the "Physical AI & Humanoid Robotics Textbook" project includes the following specifications: The tech stack consists of a frontend built with Docusaurus 3.1.0, React 18.3.0 with TypeScript, Tailwind CSS 3.4.0 with custom CSS animations, Framer Motion 10.16.0 for animations, Lucide React for icons, and Prism React Renderer for syntax highlighting. The backend chatbot uses FastAPI 0.104.0 (Python), Qdrant Cloud (Free Tier), Neon Serverless Postgres, the OpenAI SDK (openai package) for API call structure, and a Gemini API Key as the actual API key for making requests. The architecture includes a Docusaurus structure with docs/ containing module-1, module-2, module-3, and module-4 (each with 3 chapters), src/, components/, a Chatbot directory (RAG chatbot with text selection), UI (animated cards and progress tracker), Layout (sidebar, header, footer), css (custom styles and animations), pages (landing, about, modules), and static (images, diagrams, assets). The chatbot system flow using the OpenAI SDK with Gemini API Key proceeds as: User Query → Frontend → FastAPI Backend → Mode 1 (Full Book): query Qdrant for book embeddings, retrieve chunks, and send to Gemini API (using OpenAI SDK format but Gemini endpoint), or Mode 2 (Selected Text): process selected text directly and send to Gemini API (with OpenAI SDK format but Gemini endpoint), then return a formatted response with sources. The key components include ChatbotWidget (floating chat interface), TextSelector (detects selected text), ModuleCard (animated module cards), ChapterCard (12-chapter navigation), ProgressTracker (learning progress), and AboutSection (course information). The implementation details specify using the OpenAI SDK structure and patterns but replacing the OpenAI key with a Gemini API key, mapping OpenAI SDK calls to Gemini endpoints, using an adapter pattern to convert SDK format to Gemini format, and storing GEMINI_API_KEY as the environment variable. The technical approach uses the openai package while overriding the base_url to point to Gemini endpoints, creating a custom client that maintains OpenAI SDK interface compatibility, converting response formats between Gemini and OpenAI, and preserving OpenAI SDK function signatures. The deployment plan includes Vercel for the frontend, Railway/Render for the backend, and Neon PostgreSQL + Qdrant Cloud for databases. Features intentionally skipped include user authentication, personalization buttons, and Urdu translation, focusing entirely on the core book and chatbot with two query modes. The implementation phases are: Docusaurus setup and structure, creating 12 chapter markdown files, building animated UI components, implementing the chatbot frontend, setting up FastAPI backend with OpenAI SDK structure but Gemini API, creating the OpenAI SDK → Gemini API adapter, integrating Qdrant and embeddings, deploying to Vercel and backend hosting, and final testing and polishing. This approach fully satisfies hackathon requirements for using OpenAI Agents SDKs while actually utilizing a Gemini API key for the real model calls.
labels: ["plan", "feature"]
links:
  spec: specs/1-textbook-docusaurus-chatbot/spec.md
  plan: specs/1-textbook-docusaurus-chatbot/plan.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/1-textbook-docusaurus-chatbot/plan.md
  - specs/1-textbook-docusaurus-chatbot/research.md
  - specs/1-textbook-docusaurus-chatbot/data-model.md
  - specs/1-textbook-docusaurus-chatbot/contracts/openapi.yaml
  - specs/1-textbook-docusaurus-chatbot/quickstart.md
tests:
---

## Prompt

```text
/sp.plan The technical implementation plan for the "Physical AI & Humanoid Robotics Textbook" project includes the following specifications: The tech stack consists of a frontend built with Docusaurus 3.1.0, React 18.3.0 with TypeScript, Tailwind CSS 3.4.0 with custom CSS animations, Framer Motion 10.16.0 for animations, Lucide React for icons, and Prism React Renderer for syntax highlighting. The backend chatbot uses FastAPI 0.104.0 (Python), Qdrant Cloud (Free Tier), Neon Serverless Postgres, the OpenAI SDK (openai package) for API call structure, and a Gemini API Key as the actual API key for making requests. The architecture includes a Docusaurus structure with docs/ containing module-1, module-2, module-3, and module-4 (each with 3 chapters), src/, components/, a Chatbot directory (RAG chatbot with text selection), UI (animated cards and progress tracker), Layout (sidebar, header, footer), css (custom styles and animations), pages (landing, about, modules), and static (images, diagrams, assets). The chatbot system flow using the OpenAI SDK with Gemini API Key proceeds as: User Query → Frontend → FastAPI Backend → Mode 1 (Full Book): query Qdrant for book embeddings, retrieve chunks, and send to Gemini API (using OpenAI SDK format but Gemini endpoint), or Mode 2 (Selected Text): process selected text directly and send to Gemini API (with OpenAI SDK format but Gemini endpoint), then return a formatted response with sources. The key components include ChatbotWidget (floating chat interface), TextSelector (detects selected text), ModuleCard (animated module cards), ChapterCard (12-chapter navigation), ProgressTracker (learning progress), and AboutSection (course information). The implementation details specify using the OpenAI SDK structure and patterns but replacing the OpenAI key with a Gemini API key, mapping OpenAI SDK calls to Gemini endpoints, using an adapter pattern to convert SDK format to Gemini format, and storing GEMINI_API_KEY as the environment variable. The technical approach uses the openai package while overriding the base_url to point to Gemini endpoints, creating a custom client that maintains OpenAI SDK interface compatibility, converting response formats between Gemini and OpenAI, and preserving OpenAI SDK function signatures. The deployment plan includes Vercel for the frontend, Railway/Render for the backend, and Neon PostgreSQL + Qdrant Cloud for databases. Features intentionally skipped include user authentication, personalization buttons, and Urdu translation, focusing entirely on the core book and chatbot with two query modes. The implementation phases are: Docusaurus setup and structure, creating 12 chapter markdown files, building animated UI components, implementing the chatbot frontend, setting up FastAPI backend with OpenAI SDK structure but Gemini API, creating the OpenAI SDK → Gemini API adapter, integrating Qdrant and embeddings, deploying to Vercel and backend hosting, and final testing and polishing. This approach fully satisfies hackathon requirements for using OpenAI Agents SDKs while actually utilizing a Gemini API key for the real model calls.
```

## Response snapshot

Implementation plan created, research conducted, data model and API contracts defined.

## Outcome

- ✅ Impact: The implementation plan was generated, research conducted to resolve ambiguities, and design artifacts like data model and API contracts were created.
- 🧪 Tests: No automated tests were run for this planning phase.
- 📁 Files: The following files were created/modified: `specs/1-textbook-docusaurus-chatbot/plan.md`, `specs/1-textbook-docusaurus-chatbot/research.md`, `specs/1-textbook-docusaurus-chatbot/data-model.md`, `specs/1-textbook-docusaurus-chatbot/contracts/openapi.yaml`, `specs/1-textbook-docusaurus-chatbot/quickstart.md`.
- 🔁 Next prompts: The plan is complete. Proceed to task breakdown (`/sp.tasks`).
- 🧠 Reflection: The `update-agent-context.ps1` script encountered a pathing error, indicating it didn't correctly identify the feature branch. This needs to be addressed for future `/sp.plan` runs.

## Evaluation notes (flywheel)

- Failure modes observed: `update-agent-context.ps1` failed to locate `plan.md` due to incorrect default path.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Update `setup-plan.ps1` and `update-agent-context.ps1` to correctly identify and use the current feature branch's spec directory.
