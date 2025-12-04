# Implementation Plan: Physical AI & Humanoid Robotics Textbook

**Branch**: `master` | **Date**: 2025-12-04 | **Spec**: [link to feature spec, currently in prompt]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

The project aims to create a "Physical AI & Humanoid Robotics Textbook" with a Docusaurus frontend and a FastAPI backend. A key feature is a RAG chatbot that leverages Qdrant Cloud and Neon Serverless Postgres. The chatbot will integrate with the Gemini API using an OpenAI SDK-compatible interface via an adapter pattern. The implementation will focus on Docusaurus setup, chapter creation, animated UI components, chatbot frontend/backend development, and deployment to Vercel (frontend) and Railway/Render (backend).

## Technical Context

**Language/Version**: Python 3.9+ (for FastAPI 0.104.0), TypeScript (for React 18.3.0)
**Primary Dependencies**:
  - Frontend: Docusaurus 3.1.0, React 18.3.0, Tailwind CSS 3.4.0, Framer Motion 10.16.0, Lucide React, Prism React Renderer
  - Backend: FastAPI 0.104.0, Qdrant Cloud, Neon Serverless Postgres, OpenAI SDK (openai package), Gemini API
**Storage**: Qdrant Cloud (vector database), Neon Serverless Postgres (relational database)
**Testing**: `pytest` for backend, `Jest` / `React Testing Library` for frontend
**Target Platform**: Web (Docusaurus frontend), Linux server (FastAPI backend)
**Project Type**: Web (frontend) + API (backend)
**Performance Goals**: Chatbot response time under 2 seconds. Lighthouse scores above 90.
**Constraints**: Use OpenAI SDK structure/patterns for Gemini API interaction. No user authentication, personalization, or Urdu translation.
**Scale/Scope**: Physical AI & Humanoid Robotics Textbook with 4 modules, 12 chapters. RAG chatbot with two query modes.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Docusaurus-Centric Development:** PASS - Docusaurus 3.1.0 is the primary framework.
- **II. Technical Accuracy First:** N/A for plan, but will be a critical consideration during content creation and code implementation.
- **III. Educational Design:** N/A for plan, but will guide content structure (Objectives → Theory → Examples → Exercises → Summary) during content creation.
- **IV. Code Quality Standards:** PASS - TypeScript for type safety is specified. Modular React components, error handling, and comprehensive comments are expected as part of best practices.
- **V. UI/UX Excellence:** PASS - Framer Motion is used for animations, and a professional academic aesthetic, mobile-responsiveness, and accessibility are implicit design goals.
- **VI. Chatbot Requirements:** PASS - Two query modes are specified, with a performance goal of <2 seconds response time and clear source attribution.
- **VII. Deployment Ready:** PASS - Vercel for frontend, Railway/Render for backend, environment variable management, and Lighthouse scores above 90 are defined.


## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
frontend/
├── docs/
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
│   ├── module-4/
│   │   ├── chapter-10.md
│   │   ├── chapter-11.md
│   │   └── chapter-12.md
│   └── ...                  # Additional chapter markdown files
├── src/
│   ├── components/
│   │   ├── Chatbot/           # RAG chatbot with text selection
│   │   │   ├── ChatbotWidget.tsx
│   │   │   └── TextSelector.tsx
│   │   ├── UI/                # Animated cards and progress tracker
│   │   │   ├── ModuleCard.tsx
│   │   │   ├── ChapterCard.tsx
│   │   │   └── ProgressTracker.tsx
│   │   ├── Layout/            # Sidebar, header, footer
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   └── AboutSection.tsx   # Course information
│   ├── css/
│   │   └── custom.css         # Custom styles and animations
│   ├── pages/
│   │   ├── index.tsx          # Landing page
│   │   ├── about.tsx
│   │   └── modules.tsx        # Modules listing page
│   └── ...                  # Other Docusaurus source files
├── static/                # Images, diagrams, assets
└── ...                    # Other Docusaurus root files (e.g., docusaurus.config.ts)

backend/
├── src/
│   ├── main.py              # FastAPI application entry point
│   ├── services/            # Business logic for Qdrant, Gemini API interaction
│   │   ├── qdrant_service.py
│   │   ├── gemini_adapter.py # Adapter to convert OpenAI SDK calls to Gemini API
│   │   └── ...
│   └── models/              # Pydantic models for request/response validation
│       └── ...
└── tests/
    └── ...                  # Backend unit and integration tests

**Structure Decision**: The project will utilize a monorepo-like structure with distinct `frontend/` (Docusaurus-based) and `backend/` (FastAPI-based) directories at the repository root, as detailed above. This aligns with the web application architecture outlined in the feature specification.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
