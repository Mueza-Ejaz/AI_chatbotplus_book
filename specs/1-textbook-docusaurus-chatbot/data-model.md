# Data Model: Physical AI & Humanoid Robotics Textbook

## Entities

### Textbook
*   **Description**: The overarching digital textbook containing all learning content.
*   **Fields**:
    *   `id`: Unique identifier (string, primary key)
    *   `title`: Title of the textbook (string)
    *   `modules`: List of `Module` entities (array of Module IDs/references)
*   **Relationships**: Contains `Module` entities.

### Module
*   **Description**: A logical grouping of chapters within the textbook.
*   **Fields**:
    *   `id`: Unique identifier (string, primary key)
    *   `name`: Name of the module (string)
    *   `order`: Order within the textbook (integer)
    *   `chapters`: List of `Chapter` entities (array of Chapter IDs/references)
    *   `textbook_id`: Foreign key referencing the parent `Textbook` (string)
*   **Relationships**: Belongs to `Textbook`, contains `Chapter` entities.

### Chapter
*   **Description**: A fundamental unit of content within a module, adhering to a strict educational format.
*   **Fields**:
    *   `id`: Unique identifier (string, primary key)
    *   `title`: Title of the chapter (string)
    *   `order`: Order within the module (integer)
    *   `module_id`: Foreign key referencing the parent `Module` (string)
    *   `learning_objectives`: List of strings (bullet points)
    *   `main_content`: Rich text content (string/markdown)
    *   `code_examples`: List of `CodeExample` entities (array of CodeExample IDs/references)
    *   `diagrams`: List of `Diagram` entities (array of Diagram IDs/references)
    *   `exercises`: List of `Exercise` entities (array of Exercise IDs/references)
    *   `key_takeaways`: List of strings
    *   `references`: List of `Reference` entities (array of Reference IDs/references)
*   **Relationships**: Belongs to `Module`, contains content components.

### CodeExample
*   **Description**: Code snippets or blocks for demonstration and interaction.
*   **Fields**:
    *   `id`: Unique identifier (string, primary key)
    *   `language`: Programming language (string)
    *   `code`: The actual code block (string)
    *   `description`: Explanation of the code (string)
    *   `output`: Optional output/result of the code (string)
    *   `interactive`: Boolean, indicates if it's a code playground
*   **Validation Rules**: `code` field cannot be empty.

### Diagram
*   **Description**: Visual representations within the chapter content.
*   **Fields**:
    *   `id`: Unique identifier (string, primary key)
    *   `type`: Type of diagram (string, e.g., "image", "interactive")
    *   `source`: URL or base64 encoded image data (string)
    *   `caption`: Description of the diagram (string)
*   **Validation Rules**: `source` field cannot be empty.

### Exercise
*   **Description**: Hands-on tasks or conceptual questions for students.
*   **Fields**:
    *   `id`: Unique identifier (string, primary key)
    *   `type`: Type of exercise (string, e.g., "coding", "conceptual", "multiple-choice")
    *   `description`: The exercise prompt (string)
    *   `solution`: Optional solution or hint (string)
*   **Validation Rules**: `description` field cannot be empty.

### Reference
*   **Description**: External resources or citations.
*   **Fields**:
    *   `id`: Unique identifier (string, primary key)
    *   `title`: Title of the reference (string)
    *   `url`: URL of the reference (string, optional)
    *   `author`: Author(s) of the reference (string, optional)
*   **Validation Rules**: `title` or `url` must be present.

### ChatbotQuery
*   **Description**: A user's query sent to the chatbot.
*   **Fields**:
    *   `id`: Unique identifier (string, primary key)
    *   `user_id`: Identifier for the user (string, optional for personalization features, but can be a session ID)
    *   `text`: The actual query text (string)
    *   `mode`: Query mode (string, enum: "full_book", "selected_text")
    *   `selected_text`: The text selected by the user (string, optional, only for `selected_text` mode)
    *   `timestamp`: Time of the query (datetime)
*   **Validation Rules**: `text` field cannot be empty. If `mode` is `selected_text`, `selected_text` cannot be empty.

### ChatbotResponse
*   **Description**: The chatbot's answer to a user's query.
*   **Fields**:
    *   `id`: Unique identifier (string, primary key)
    *   `query_id`: Foreign key referencing the parent `ChatbotQuery` (string)
    *   `text`: The response text from the chatbot (string)
    *   `sources`: List of strings/references indicating where the information was sourced from in the textbook.
    *   `timestamp`: Time of the response (datetime)
*   **Validation Rules**: `text` field cannot be empty.
