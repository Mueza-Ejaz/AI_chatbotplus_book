# Tasks: Physical AI & Humanoid Robotics Textbook

**Branch**: `master` | **Date**: 2025-12-04
**Feature Spec**: (Link to the original feature specification will be added here if available, otherwise "Refer to /sp.plan create prompt")
**Implementation Plan**: C:\Users\Yousuf Traders\.gemini\chatbot_plusbook\specs\master\plan.md

## Summary

This document outlines the detailed, dependency-ordered tasks required to implement the "Physical AI & Humanoid Robotics Textbook" feature, structured by user stories and phases for independent development and testing.

## Dependencies between User Stories

-   **US1 (Textbook Content Display)**: Independent.
-   **US2 (RAG Chatbot - Full Book)**: Depends on US1 (for content to query) and Phase 2 (Foundational - for Qdrant/Gemini setup).
-   **US3 (RAG Chatbot - Selected Text)**: Depends on US1 (for content to select) and US2 (for core chatbot functionality).
-   **US4 (Learning Progress Tracking)**: Depends on US1 (for chapters to track).

## Parallel Execution Opportunities

-   Frontend UI component development (e.g., ModuleCard, ChapterCard, ProgressTracker) can be done in parallel with backend API development.
-   Content creation (writing markdown chapters) can be parallelized.
-   Chatbot frontend integration can happen in parallel with backend RAG logic development once the API contract is stable.

## Implementation Strategy

The implementation will follow an MVP-first approach, prioritizing core textbook display and basic chatbot functionality (US1 and US2). Subsequent user stories (US3, US4) and polish will be integrated incrementally. This allows for early validation and iterative development.

---

## Phase 1: Setup (Project Initialization)

*Goal*: Establish the basic project structure and development environment for both frontend and backend.

-   [ ] T001 Create root `frontend/` and `backend/` directories.
-   [ ] T002 Initialize Docusaurus project within `frontend/` directory, including `frontend/docusaurus.config.ts`, `frontend/src/`, and `frontend/docs/`.
-   [ ] T003 Configure `tsconfig.json` for TypeScript in `frontend/`.
-   [ ] T004 Initialize FastAPI project within `backend/` directory, including `backend/src/main.py` and `backend/requirements.txt`.
-   [ ] T005 Set up Python virtual environment and install `fastapi`, `uvicorn`, `openai`, `qdrant-client`, `psycopg2-binary`, `python-dotenv` in `backend/requirements.txt`.
-   [ ] T006 Configure Tailwind CSS in `frontend/`.
-   [ ] T007 Install Framer Motion, Lucide React, Prism React Renderer in `frontend/`.
-   [ ] T008 Create `.env` file in `backend/` with placeholders for `GEMINI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, `DATABASE_URL`.

---

## Phase 2: Foundational (Blocking Prerequisites)

*Goal*: Implement core infrastructure components that all user stories might depend on.

-   [ ] T009 Create `backend/src/services/qdrant_service.py` for Qdrant client initialization and basic interaction.
-   [ ] T010 Create `backend/src/services/gemini_adapter.py` to wrap OpenAI SDK for Gemini API calls, including `base_url` override and response format conversion.
-   [ ] T011 Create `backend/src/models/` directory for Pydantic models.
-   [ ] T012 Implement initial `Module`, `Chapter`, `Textbook` schemas in `backend/src/models/data_models.py` (reflecting data model from `data-model.md`).
-   [ ] T013 Setup basic PostgreSQL connection in `backend/src/services/database.py`.
-   [ ] T014 Write script `scripts/load_textbook_content.py` to parse markdown files, generate embeddings, store in Qdrant, and metadata in PostgreSQL. This task is crucial for having content for the chatbot.

---

## Phase 3: User Story 1: Textbook Content Display [US1]

*Goal*: Enable users to browse the textbook content with Docusaurus and animated UI components.

*Independent Test Criteria*:
-   Docusaurus site loads without errors.
-   All 4 modules and 12 chapters are accessible and display content.
-   UI components (ModuleCard, ChapterCard) show expected animations.
-   Header, footer, and sidebar are correctly rendered.

### Implementation for User Story 1

-   [ ] T015 Create `frontend/docs/module-1/chapter-1.md` through `frontend/docs/module-4/chapter-12.md` as placeholder markdown files (12 files total).
-   [ ] T016 [P] Design and implement `frontend/src/components/UI/ModuleCard.tsx`.
-   [ ] T017 [P] Design and implement `frontend/src/components/UI/ChapterCard.tsx`.
-   [ ] T018 Implement `frontend/src/components/Layout/Header.tsx`, `frontend/src/components/Layout/Footer.tsx`, and `frontend/src/components/Layout/Sidebar.tsx`.
-   [ ] T019 Develop `frontend/src/pages/index.tsx` (landing page), `frontend/src/pages/about.tsx`, and `frontend/src/pages/modules.tsx`.
-   [ ] T020 Integrate `ModuleCard` and `ChapterCard` into `frontend/src/pages/modules.tsx` for navigation.
-   [ ] T021 Apply custom CSS styles and animations in `frontend/src/css/custom.css`.
-   [ ] T022 Populate `frontend/static/` with initial images, diagrams, and assets.

---

## Phase 4: User Story 2: RAG Chatbot Interaction (Full Book Query) [US2]

*Goal*: Allow users to query the entire textbook content through the RAG chatbot.

*Independent Test Criteria*:
-   Chatbot widget is visible and interactive.
-   Sending a general query returns a relevant response.
-   Responses include sources (e.g., chapter titles or identifiers).
-   Chatbot responds within 2 seconds.

### Implementation for User Story 2

-   [ ] T023 [P] Design and implement `frontend/src/components/Chatbot/ChatbotWidget.tsx` (floating chat interface).
-   [ ] T024 Create FastAPI endpoint `/chat` in `backend/src/main.py` matching `openapi.yaml` for full book query mode.
-   [ ] T025 Implement RAG logic in `backend/src/services/qdrant_service.py` to query Qdrant for book embeddings.
-   [ ] T026 Integrate `gemini_adapter.py` for sending queries to Gemini API and processing responses in `qdrant_service.py`.
-   [ ] T027 Develop `backend/src/models/chatbot_models.py` for request/response Pydantic models for `/chat` endpoint, including `Conversation` and `Message` entities.
-   [ ] T028 Implement frontend-to-backend API call from `ChatbotWidget.tsx` to `/chat` endpoint.
-   [ ] T029 Display chatbot responses and sources in `ChatbotWidget.tsx`.

---

## Phase 5: User Story 3: RAG Chatbot Interaction (Selected Text Query) [US3]

*Goal*: Enable users to ask for elaborations on selected text.

*Independent Test Criteria*:
-   Text selection on pages is detected by `TextSelector`.
-   Chatbot can be invoked with selected text.
-   Responses for selected text queries are relevant and include sources.

### Implementation for User Story 3

-   [ ] T030 [P] Design and implement `frontend/src/components/Chatbot/TextSelector.tsx` to detect selected text.
-   [ ] T031 Modify FastAPI endpoint `/chat` in `backend/src/main.py` to handle `selected_text` from `openapi.yaml`.
-   [ ] T032 Update RAG logic in `backend/src/services/qdrant_service.py` to process `selected_text` directly with Gemini API.
-   [ ] T033 Integrate `TextSelector.tsx` with `ChatbotWidget.tsx` to pass selected text for query.

---

## Phase 6: User Story 4: Learning Progress Tracking [US4]

*Goal*: Display user's learning progress.

*Independent Test Criteria*:
-   `ProgressTracker` component is visible.
-   (Manual) Marking a chapter as read (e.g., via UI interaction) updates the tracker visually.

### Implementation for User Story 4

-   [ ] T034 [P] Design and implement `frontend/src/components/UI/ProgressTracker.tsx`.
-   [ ] T035 Integrate `ProgressTracker.tsx` into a relevant layout component or page (e.g., sidebar or modules page).
-   [ ] T036 (Frontend Only) Implement basic local storage for tracking read chapters in `frontend/src/services/progress_service.ts`. (Given no authentication, local storage is a simple solution)

---

## Final Phase: Polish & Cross-Cutting Concerns

*Goal*: Enhance the overall user experience, ensure performance, and prepare for deployment.

-   [ ] T037 Review and optimize Docusaurus build for performance.
-   [ ] T038 Implement comprehensive error handling for frontend and backend, including logging.
-   [ ] T039 Set up Vercel deployment for `frontend/`.
-   [ ] T040 Set up Railway/Render deployment for `backend/`.
-   [ ] T041 Conduct end-to-end testing of chatbot functionality.
-   [ ] T042 Verify Lighthouse scores are above 90 for the frontend.
-   [ ] T043 Add detailed comments and documentation for complex code sections.
-   [ ] T044 Final review of all UI elements for consistency, responsiveness, and accessibility.

---

## Dependencies & Execution Order

### Phase Dependencies

-   **Setup (Phase 1)**: No dependencies - can start immediately
-   **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
-   **User Stories (Phase 3+)**: All depend on Foundational phase completion
    -   User stories can then proceed in parallel (if staffed)
    -   Or sequentially in priority order (US1 → US2 → US3 → US4)
-   **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

-   **User Story 1 (US1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
-   **User Story 2 (US2)**: Can start after Foundational (Phase 2) - Depends on US1 for content.
-   **User Story 3 (US3)**: Can start after Foundational (Phase 2) - Depends on US1 for content, US2 for core chatbot.
-   **User Story 4 (US4)**: Can start after Foundational (Phase 2) - Depends on US1 for chapters to track.

### Within Each User Story

-   Tests (if included) MUST be written and FAIL before implementation
-   Models before services
-   Services before endpoints
-   Core implementation before integration
-   Story complete before moving to next priority

### Parallel Opportunities

-   All Setup tasks marked [P] can run in parallel
-   All Foundational tasks marked [P] can run in parallel (within Phase 2)
-   Once Foundational phase completes, certain tasks within user stories can start in parallel (e.g., UI component development)
-   Different user stories can be worked on in parallel by different team members, respecting dependencies.

---

## Parallel Example: User Story 1

```bash
# Launch all UI component development for User Story 1 together:
- [ ] T016 [P] Design and implement frontend/src/components/UI/ModuleCard.tsx
- [ ] T017 [P] Design and implement frontend/src/components/UI/ChapterCard.tsx
```

## Implementation Strategy

### MVP First (User Story 1 & 2)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3.  Complete Phase 3: User Story 1
4.  Complete Phase 4: User Story 2
5.  **STOP and VALIDATE**: Test US1 and US2 independently and together.
6.  Deploy/demo if ready

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready
2.  Add User Story 1 → Test independently → Deploy/Demo (MVP 1!)
3.  Add User Story 2 → Test independently → Deploy/Demo (MVP 2!)
4.  Add User Story 3 → Test independently → Deploy/Demo
5.  Add User Story 4 → Test independently → Deploy/Demo
6.  Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1.  Team completes Setup + Foundational together
2.  Once Foundational is done:
    -   Developer A: User Story 1
    -   Developer B: User Story 2
    -   Developer C: User Story 3
    -   Developer D: User Story 4 (or assist others)
3.  Stories complete and integrate independently

---

## Notes

-   [P] tasks = different files, no dependencies
-   [Story] label maps task to specific user story for traceability
-   Each user story should be independently completable and testable
-   Verify tests fail before implementing
-   Commit after each task or logical group
-   Stop at any checkpoint to validate story independently
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence



