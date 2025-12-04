# Data Model: Physical AI & Humanoid Robotics Textbook

## Core Entities

### Module

Represents a thematic section of the textbook.

-   **id** (string, UUID): Unique identifier for the module.
-   **title** (string): The title of the module (e.g., "Module 1: Introduction to Robotics").
-   **description** (string, optional): A brief overview of the module's content.
-   **chapter_ids** (list of string, UUIDs): Ordered list of Chapter IDs belonging to this module.

### Chapter

Represents a single chapter within a module.

-   **id** (string, UUID): Unique identifier for the chapter.
-   **module_id** (string, UUID): The ID of the module this chapter belongs to.
-   **title** (string): The title of the chapter (e.g., "Chapter 1: History and Evolution of AI").
-   **content_path** (string): File path to the Markdown content of the chapter (e.g., `docs/module-1/chapter-1.md`).
-   **objectives** (list of string): Learning objectives for the chapter.
-   **theory_summary** (string, optional): A brief summary of the theoretical concepts covered.
-   **examples_summary** (string, optional): A brief summary of examples provided.
-   **exercises_summary** (string, optional): A brief summary of exercises.
-   **summary** (string): Concluding summary of the chapter.

### Textbook

The overall collection of modules and chapters.

-   **title** (string): "Physical AI & Humanoid Robotics Textbook".
-   **module_ids** (list of string, UUIDs): Ordered list of Module IDs that comprise the textbook.
-   **version** (string): Current version of the textbook content.

## Chatbot Related Entities

### Conversation

Represents a single chat session with the chatbot.

-   **id** (string, UUID): Unique identifier for the conversation.
-   **start_timestamp** (datetime): When the conversation began.
-   **messages** (list of string, UUIDs): Ordered list of Message IDs within this conversation.

### Message

Represents a single message within a conversation, from either user or bot.

-   **id** (string, UUID): Unique identifier for the message.
-   **conversation_id** (string, UUID): The ID of the conversation this message belongs to.
-   **sender** (enum: "user", "bot"): Indicates who sent the message.
-   **content** (string): The text content of the message.
-   **timestamp** (datetime): When the message was sent.
-   **sources** (list of string, optional): List of Chapter IDs or content references that served as sources for a bot response.

## Relationships

-   One `Textbook` has many `Modules`.
-   One `Module` has many `Chapters`.
-   One `Conversation` has many `Messages`.
-   `Message` can reference `Chapter` (for sources).

## Validation Rules

-   All IDs (`module_id`, `chapter_id`, `conversation_id`, `message_id`) must be unique UUIDs.
-   `title` fields must not be empty.
-   `content_path` must point to a valid Markdown file.
-   `sender` enum must be one of "user" or "bot".
-   `sources` in a `Message` must refer to existing `Chapter` IDs or valid content references.
