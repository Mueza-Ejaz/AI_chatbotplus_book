# Actionable Tasks: Physical AI & Humanoid Robotics Textbook

**Feature Branch**: `1-textbook-docusaurus-chatbot`
**Date**: 2025-12-05
**Plan**: `specs/1-textbook-docusaurus-chatbot/plan.md`
**Spec**: `specs/1-textbook-docusaurus-chatbot/spec.md`

## Summary of Tasks

This document outlines the actionable tasks for building the "Physical AI & Humanoid Robotics Textbook" project. Tasks are organized into phases, prioritizing foundational elements and then proceeding by user story. Each task follows a strict checklist format for clarity and traceability.

## Implementation Strategy

The implementation will follow an iterative approach, focusing on delivering the Minimum Viable Product (MVP) first, which primarily covers User Story 1 (Read Textbook Content). Subsequent user stories will be integrated incrementally. This strategy allows for early testing and validation of core functionalities.

## Task Dependencies

User Story 1 (Read Textbook Content) has minimal dependencies on other stories, making it suitable for early implementation. User Story 2 (Utilize Chatbot for Queries) depends on a functional backend and frontend integration, and partially on User Story 1's content structure. User Story 3 (Explore Landing Page & About Section) can be developed largely in parallel with other stories but relies on core Docusaurus setup.

## Phase 1: Setup (Project Initialization)

- [ ] T001 Initialize Docusaurus project in `frontend/` directory.
- [ ] T002 Initialize FastAPI project in `backend/` directory.
- [ ] T003 Configure Git repository for monorepo structure.

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T004 Define core folder structure for `frontend/src/` (components, theme, pages, css).
- [ ] T005 Define core folder structure for `backend/src/` (api, services, models).
- [ ] T006 Configure `frontend/docusaurus.config.ts` with basic metadata and theme settings.
- [ ] T007 Configure `frontend/sidebars.ts` for textbook navigation structure (initial empty setup).
- [ ] T008 Setup Tailwind CSS for Docusaurus in `frontend/`.
- [ ] T009 Create basic `backend/main.py` with a root endpoint and `backend/requirements.txt`.
- [ ] T010 Setup basic frontend testing environment with Jest and React Testing Library in `frontend/`.
- [ ] T011 Setup basic backend testing environment with Pytest and FastAPI's TestClient in `backend/`.

## Phase 3: User Story 1 - Read Textbook Content (P1)

Goal: A student can navigate the textbook, read chapter content, and utilize interactive diagrams and code playgrounds.

Independent Test Criteria:
*   User can navigate to any chapter page.
*   All content elements (objectives, main content, code examples, diagrams, exercises, takeaways, references) are displayed correctly.
*   Navigation (sidebar, next/previous buttons, ToC) functions as expected.
*   Dark/light mode toggles correctly.

- [ ] T012 [US1] Create markdown files for Module 1 chapters (1-3) in `frontend/docs/module-1/`.
- [ ] T013 [US1] Create markdown files for Module 2 chapters (4-6) in `frontend/docs/module-2/`.
- [ ] T014 [US1] Create markdown files for Module 3 chapters (7-9) in `frontend/docs/module-3/`.
- [ ] T015 [US1] Create markdown files for Module 4 chapters (10-12) in `frontend/docs/module-4/`.
- [ ] T016 [US1] Update `frontend/sidebars.ts` to include all 12 chapters.
- [ ] T017 [US1] Implement a generic Docusaurus layout for chapter pages in `frontend/src/theme/`.
- [ ] T018 [US1] Create React components for displaying learning objectives, key takeaways, references in `frontend/src/components/`.
- [ ] T019 [P] [US1] Create placeholder components for interactive diagrams in `frontend/src/components/`.
- [ ] T020 [P] [US1] Create placeholder components for code playgrounds in `frontend/src/components/`.
- [ ] T021 [US1] Implement chapter navigation (next/previous buttons) within chapter layout in `frontend/src/components/`.
- [ ] T022 [US1] Implement progress tracker component for chapter pages in `frontend/src/components/ProgressTracker/index.tsx`.
- [ ] T023 [US1] Ensure collapsible sidebar navigation is functional.
- [ ] T024 [US1] Implement dark/light mode toggle and styling for chapter pages in `frontend/src/css/custom.css`.

## Phase 4: User Story 2 - Utilize Chatbot for Queries (P1)

Goal: A student can use the chatbot to query the entire book or selected text for information.

Independent Test Criteria:
*   Chatbot widget appears and can be toggled.
*   Chatbot responds to queries in "Query Book" mode with relevant, sourced information.
*   Chatbot responds to queries in "Query Selected Text" mode based *only* on selected text.
*   Clear chat and export conversation options function.
*   API endpoints (`/api/chat`, `/api/ingest`, `/api/health`) are functional.

### Backend Tasks for User Story 2

- [ ] T025 [P] [US2] Implement `/api/health` endpoint in `backend/src/api/health.py`.
- [ ] T026 [US2] Define Pydantic models for chat requests and responses in `backend/src/models/chat.py`.
- [ ] T027 [US2] Define Pydantic models for ingestion requests and responses in `backend/src/models/ingest.py`.
- [ ] T028 [US2] Implement Qdrant client integration in `backend/src/services/qdrant_service.py`.
- [ ] T029 [US2] Implement OpenAI/Gemini API adapter for embeddings and chat completions in `backend/src/services/gemini_service.py`.
- [ ] T030 [US2] Implement core chatbot logic (query processing, response generation, source attribution) in `backend/src/services/chatbot_service.py`.
- [ ] T031 [US2] Implement `/api/chat` endpoint, integrating `chatbot_service` and `qdrant_service` in `backend/src/api/chat.py`.
- [ ] T032 [US2] Implement content ingestion logic (text processing, embedding generation, Qdrant storage) in `backend/src/services/ingestion_service.py`.
- [ ] T033 [US2] Implement `/api/ingest` endpoint, integrating `ingestion_service` in `backend/src/api/ingest.py`.
- [ ] T034 [US2] Create an ingestion script (e.g., `backend/scripts/ingest_content.py`) to process markdown files and call `/api/ingest`.
- [ ] T035 [US2] Implement unit tests for `qdrant_service` and `gemini_service` using Pytest in `backend/tests/services/`.
- [ ] T036 [US2] Implement integration tests for `/api/chat` and `/api/ingest` using FastAPI's TestClient in `backend/tests/api/`.

### Frontend Tasks for User Story 2

- [ ] T037 [US2] Create `ChatbotWidget` React component in `frontend/src/components/ChatbotWidget/index.tsx`.
- [ ] T038 [US2] Implement floating chat button UI in `ChatbotWidget`.
- [ ] T039 [US2] Implement chat interface with message bubbles and input field in `ChatbotWidget`.
- [ ] T040 [US2] Implement toggle for "Query Book" and "Query Selected Text" modes in `ChatbotWidget`.
- [ ] T041 [US2] Implement clear chat history functionality in `ChatbotWidget`.
- [ ] T042 [US2] Implement export conversation functionality in `ChatbotWidget`.
- [ ] T043 [US2] Integrate `ChatbotWidget` into the Docusaurus layout to appear on all pages.
- [ ] T044 [US2] Implement API calls from frontend to backend `/api/chat` endpoint.
- [ ] T045 [US2] Add basic styling for the chatbot widget in `frontend/src/components/ChatbotWidget/styles.module.css`.

## Phase 5: User Story 3 - Explore Landing Page & About Section (P2)

Goal: A prospective student can learn about the textbook, its structure, and prerequisites from the landing page and about section.

Independent Test Criteria:
*   Landing page displays all required sections (hero, module cards, about, stats, chatbot button).
*   Module cards show hover effects.
*   About section page displays all required information (overview, hardware, prerequisites, instructor, links).

- [ ] T046 [US3] Create Landing Page (`frontend/src/pages/index.tsx`).
- [ ] T047 [US3] Implement hero section with animated title on landing page.
- [ ] T048 [US3] Create `ModuleCard` React component in `frontend/src/components/ModuleCard/index.tsx`.
- [ ] T049 [US3] Implement four `ModuleCard` instances with hover effects on the landing page.
- [ ] T050 [US3] Implement quick stats display on the landing page.
- [ ] T051 [US3] Integrate chatbot access button on the landing page.
- [ ] T052 [US3] Create About Page (`frontend/src/pages/about.tsx`).
- [ ] T053 [US3] Implement course overview and instructor info on the About page.
- [ ] T054 [US3] Implement hardware requirements table and prerequisites on the About page.
- [ ] T055 [US3] Display GitHub repo link and MIT License info on the About page.
- [ ] T056 [US3] Add styling for landing page and about page in `frontend/src/pages/index.module.css` and `frontend/src/css/custom.css`.

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T057 Optimize Docusaurus build process for performance.
- [ ] T058 Implement image optimization and lazy loading for static assets in `frontend/static/`.
- [ ] T059 Review and enhance all animations (page transitions, scroll-triggered) using Framer Motion.
- [ ] T060 Conduct a full Lighthouse audit and address performance, accessibility, and SEO issues.
- [ ] T061 Ensure full responsiveness across all screen sizes for both frontend and chatbot.
- [ ] T062 Implement deployment configurations for Vercel (frontend) and Railway/Render (backend).
- [ ] T063 Refine interactive diagrams and code playgrounds with actual functionality.
- [ ] T064 Conduct comprehensive end-to-end testing for all user stories.
- [ ] T065 Create a `README.md` in the project root with setup, run, and deployment instructions.

## Parallel Execution Examples

### User Story 1 (Read Textbook Content)

Tasks T012-T015 (creating chapter markdown files) can be executed in parallel by different contributors or sequentially as content becomes available. Tasks T019 and T020 (placeholder interactive components) can also be developed in parallel as they have no hard dependencies on each other.

### User Story 2 (Utilize Chatbot for Queries)

Backend tasks (T025-T036) and Frontend tasks (T037-T045) can largely be developed in parallel after the API contracts (`openapi.yaml`) are stable. Specifically, tasks T025, T028, T029, T037, T038, T045 can be started concurrently.

### User Story 3 (Explore Landing Page & About Section)

Tasks T047-T051 (landing page components) and T052-T055 (about page content) can be developed in parallel.

## Suggested MVP Scope

For the initial MVP, focus solely on completing **User Story 1 - Read Textbook Content**. This establishes the core value proposition of the project. Once the textbook content is fully navigable and displayable, move on to integrating the chatbot and then refining the landing/about pages.

## Total Task Count

Total tasks: 65

## Task Count per User Story

*   Setup: 3 tasks
*   Foundational: 8 tasks
*   User Story 1: 13 tasks
*   User Story 2 (Backend): 12 tasks
*   User Story 2 (Frontend): 9 tasks
*   User Story 3: 11 tasks
*   Polish & Cross-Cutting Concerns: 9 tasks
