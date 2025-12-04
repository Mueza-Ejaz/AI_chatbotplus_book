---
id: 0002
title: Create feature specification for textbook
stage: spec
date: 2025-12-04
surface: agent
model: gemini-pro
feature: 1-textbook-docusaurus-chatbot
branch: 1-textbook-docusaurus-chatbot
user: CLI User
command: /sp.specify Build a Docusaurus-based textbook titled "Physical AI & Humanoid Robotics" with the following specifications: The book structure consists of 4 modules with 3 chapters each (12 chapters total). Module 1: The Robotic Nervous System (ROS 2) includes Chapter 1: ROS 2 Architecture & Core Concepts, Chapter 2: Nodes, Topics, Services in ROS 2, and Chapter 3: URDF for Humanoid Robots. Module 2: The Digital Twin (Gazebo & Unity) includes Chapter 4: Gazebo Physics Simulation, Chapter 5: Unity High-Fidelity Rendering, and Chapter 6: Sensor Simulation (LiDAR, Cameras, IMUs). Module 3: The AI-Robot Brain (NVIDIA Isaac) includes Chapter 7: Isaac Sim for Photorealistic Training, Chapter 8: Isaac ROS for Hardware-Accelerated Perception, and Chapter 9: Nav2 for Bipedal Navigation. Module 4: Vision-Language-Action (VLA) includes Chapter 10: Voice Commands with OpenAI Whisper, Chapter 11: LLMs for Cognitive Planning, and Chapter 12: Capstone: Autonomous Humanoid. Each chapter must follow a strict chapter format consisting of: Learning Objectives (bullet points), Main Content (2000–3000 words with technical depth), Code Examples (with proper syntax highlighting), Diagrams/Figures (interactive where possible), Hands-on Exercises, Key Takeaways, and References & Further Reading. The UI Requirements include a Landing Page with a hero section and animated title, four module cards with hover effects, a course details About section, quick stats display, and a chatbot access button; Chapter Pages with clean Inter typography, collapsible sidebar navigation, progress tracker, next/previous buttons, table of contents, code playground, and dark/light mode; Animations including page transitions, hover effects, scroll-triggered animations, loading animations, and interactive diagrams; and an About Section including course overview, hardware requirements table, prerequisites, instructor info, GitHub repo link, and MIT License info. The Chatbot Specifications include a frontend component with a floating chat button in the bottom-right corner, chat interface with message bubbles, a toggle between “Query Book” and “Query Selected Text,” a clear chat button, and an export conversation option. The backend must follow FastAPI with endpoints POST /api/chat, POST /api/ingest, and GET /api/health, using a Qdrant vector database for embeddings and OpenAI GPT-4o-mini for responses, supporting two query modes: Mode A (query entire book) and Mode B (answer based on selected text only. The technical constraints require use of free tier services such as Qdrant Cloud and Neon Postgres, optimization for performance, skipping bonus features such as auth, personalization, or Urdu translation, and full deployment on Vercel.
labels: ["specification", "feature"]
links:
  spec: specs/1-textbook-docusaurus-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/1-textbook-docusaurus-chatbot/spec.md
  - specs/1-textbook-docusaurus-chatbot/checklists/requirements.md
tests:
---

## Prompt

```text
/sp.specify Build a Docusaurus-based textbook titled "Physical AI & Humanoid Robotics" with the following specifications: The book structure consists of 4 modules with 3 chapters each (12 chapters total). Module 1: The Robotic Nervous System (ROS 2) includes Chapter 1: ROS 2 Architecture & Core Concepts, Chapter 2: Nodes, Topics, Services in ROS 2, and Chapter 3: URDF for Humanoid Robots. Module 2: The Digital Twin (Gazebo & Unity) includes Chapter 4: Gazebo Physics Simulation, Chapter 5: Unity High-Fidelity Rendering, and Chapter 6: Sensor Simulation (LiDAR, Cameras, IMUs). Module 3: The AI-Robot Brain (NVIDIA Isaac) includes Chapter 7: Isaac Sim for Photorealistic Training, Chapter 8: Isaac ROS for Hardware-Accelerated Perception, and Chapter 9: Nav2 for Bipedal Navigation. Module 4: Vision-Language-Action (VLA) includes Chapter 10: Voice Commands with OpenAI Whisper, Chapter 11: LLMs for Cognitive Planning, and Chapter 12: Capstone: Autonomous Humanoid. Each chapter must follow a strict chapter format consisting of: Learning Objectives (bullet points), Main Content (2000–3000 words with technical depth), Code Examples (with proper syntax highlighting), Diagrams/Figures (interactive where possible), Hands-on Exercises, Key Takeaways, and References & Further Reading. The UI Requirements include a Landing Page with a hero section and animated title, four module cards with hover effects, a course details About section, quick stats display, and a chatbot access button; Chapter Pages with clean Inter typography, collapsible sidebar navigation, progress tracker, next/previous buttons, table of contents, code playground, and dark/light mode; Animations including page transitions, hover effects, scroll-triggered animations, loading animations, and interactive diagrams; and an About Section including course overview, hardware requirements table, prerequisites, instructor info, GitHub repo link, and MIT License info. The Chatbot Specifications include a frontend component with a floating chat button in the bottom-right corner, chat interface with message bubbles, a toggle between “Query Book” and “Query Selected Text,” a clear chat button, and an export conversation option. The backend must follow FastAPI with endpoints POST /api/chat, POST /api/ingest, and GET /api/health, using a Qdrant vector database for embeddings and OpenAI GPT-4o-mini for responses, supporting two query modes: Mode A (query entire book) and Mode B (answer based on selected text only. The technical constraints require use of free tier services such as Qdrant Cloud and Neon Postgres, optimization for performance, skipping bonus features such as auth, personalization, or Urdu translation, and full deployment on Vercel.
```

## Response snapshot

Feature specification created and validated.

## Outcome

- ✅ Impact: The feature specification and its quality checklist were successfully generated.
- 🧪 Tests: No automated tests were run for this specification.
- 📁 Files: Two files were created/modified: `specs/1-textbook-docusaurus-chatbot/spec.md` and `specs/1-textbook-docusaurus-chatbot/checklists/requirements.md`.
- 🔁 Next prompts: The specification is ready for planning (`/sp.plan`).
- 🧠 Reflection: The `create-new-feature.ps1` script execution encountered parsing issues. The spec and checklist were generated directly as a workaround.

## Evaluation notes (flywheel)

- Failure modes observed: `run_shell_command` had issues parsing the complex string argument for the `create-new-feature.ps1` script.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Improve `run_shell_command`'s handling of complex string arguments or enhance script to read from a temporary file.
