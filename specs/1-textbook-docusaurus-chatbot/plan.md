# Implementation Plan: Physical AI & Humanoid Robotics Textbook

**Branch**: `1-textbook-docusaurus-chatbot` | **Date**: 2025-12-04 | **Spec**: `specs/1-textbook-docusaurus-chatbot/spec.md`
**Input**: Feature specification from `/specs/1-textbook-docusaurus-chatbot/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

The project aims to build a Docusaurus-based textbook on "Physical AI & Humanoid Robotics" featuring a structured content across 4 modules and 12 chapters, each adhering to a strict educational format. It includes a comprehensive UI/UX for navigation, animation, and information display. A key component is a FastAPI chatbot backend, utilizing Qdrant and OpenAI GPT-4o-mini (via Gemini API key), offering full book or selected text queries. The development emphasizes free-tier services, performance optimization, and deployment on Vercel/Railway/Render, while intentionally omitting advanced features like authentication or personalization.

## Technical Context

**Language/Version**: TypeScript (for Docusaurus/React), Python 3.11+ (for FastAPI)  
**Primary Dependencies**:
*   Frontend: Docusaurus 3.1.0, React 18.3.0, TypeScript, Tailwind CSS 3.4.0, Framer Motion 10.16.0, Lucide React, Prism React Renderer
*   Backend: FastAPI 0.104.0, Qdrant Cloud (client library), OpenAI SDK (Python package), Neon Serverless Postgres (client library)  
**Storage**: Qdrant vector database (for embeddings), Neon Serverless Postgres (for general app data if needed)  
**Testing**: Frontend: Jest and React Testing Library; Backend: Pytest with FastAPI's TestClient  
**Target Platform**: Web (Vercel for frontend, Railway/Render for backend)
**Project Type**: Web application (Frontend + Backend)  
**Performance Goals**: Lighthouse scores above 90 (from spec)  
**Constraints**: Use of free-tier services (Qdrant Cloud, Neon Postgres), fast chatbot response time (< 2 seconds), no auth, no personalization, no Urdu translation.  
**Scale/Scope**: 4 modules, 12 chapters, full textbook content, interactive UI, chatbot with two query modes.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

All Constitution principles are upheld by the feature specification and technical plan:
*   **I. Docusaurus-Centric Development**: Yes, explicitly required by the spec.
*   **II. Technical Accuracy First**: Yes, all robotics/AI concepts and code examples must be factually correct and runnable.
*   **III. Educational Design**: Yes, the chapter format (Objectives → Theory → Examples → Exercises → Summary) and progressive learning path are explicitly detailed.
*   **IV. Code Quality Standards**: Yes, TypeScript for type safety, modular React components, proper error handling, and comprehensive comments are implied by the tech stack and general best practices.
*   **V. UI/UX Excellence**: Yes, smooth animations, academic aesthetic, mobile-responsive design, and accessibility are all explicitly stated UI requirements.
*   **VI. Chatbot Requirements**: Yes, two modes (Full book, Selected text), fast response time (< 2s), clear source attribution, and user-friendly interface are all detailed in the spec.
*   **VII. Deployment Ready**: Yes, Vercel deployment, environment variable management, performance optimization, and SEO friendly structure are outlined.

## Project Structure

### Documentation (this feature)

```text
specs/1-textbook-docusaurus-chatbot/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── api/             # FastAPI endpoints (chat, ingest, health)
│   ├── services/        # Chatbot logic, Qdrant interaction, Gemini API adapter
│   └── models/          # Data models (Pydantic for FastAPI)
└── tests/               # Backend tests (NEED CLARIFICATION on framework)

frontend/                # Docusaurus project root
├── docs/                # Textbook content (module-1, module-2, module-3, module-4)
│   ├── module-1/
│   │   ├── chapter-1.md
│   │   ├── chapter-2.md
│   │   └── chapter-3.md
│   ├── module-2/
│   │   ├── chapter-4.md
│   │   ├── chapter-5.md
│   │   └── chapter-6.md
│   ├── module-3/
│   │   ├── chapter-7.md
│   │   ├── chapter-8.md
│   │   └── chapter-9.md
│   └── module-4/
│       ├── chapter-10.md
│       ├── chapter-11.md
│       └── chapter-12.md
├── src/
│   ├── components/      # React components (ChatbotWidget, ModuleCard, ChapterCard, ProgressTracker)
│   ├── theme/           # Docusaurus theming and customization
│   ├── pages/           # Landing, About, Modules pages
│   └── css/             # Custom styles and animations
├── static/              # Images, diagrams, assets
├── docusaurus.config.ts # Docusaurus configuration
└── tests/               # Frontend tests (NEED CLARIFICATION on framework)
```

**Structure Decision**: The project will utilize a monorepo-like structure with `frontend/` for the Docusaurus application and `backend/` for the FastAPI chatbot API. This clearly separates concerns and aligns with the web application option.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| | | |