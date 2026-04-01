# RituaLens

RituaLens is a sophisticated web application designed for the deep exegesis of Masonic texts, symbols, and rituals. It provides a structured framework using conceptual "lenses" to analyze ritualistic texts from various perspectives, such as psychological, philosophical, and dramaturgical. The application leverages the power of Google's Gemini AI to generate detailed analyses and synthesize complex interpretations.

## Features

-   **Multi-Lens Analysis**: Analyze a single ritual text through dozens of specialized conceptual lenses and sub-lenses.
-   **AI-Powered Insights**: Use the Gemini AI to generate detailed or concise analyses based on selected lenses and guiding questions.
-   **Creative Synthesis**: Combine up to four different lenses to generate a unique, multi-layered synthesis that reveals deeper connections and meanings within the text.
-   **Lens Explorer**: A comprehensive encyclopedia of all available conceptual lenses, explaining their purpose, function, and key analytical questions.
-   **Sleek & Responsive UI**: A modern, accessible interface designed for focused work and a seamless user experience.

## Tech Stack

-   **Frontend**: TypeScript, HTML5, CSS3
-   **AI**: Google Gemini API via `@google/genai` SDK
-   **Build**: No explicit build step required in the provided environment; modules are handled via `importmap`.

## Setup & Usage

To run this application, you need a valid API key for the Google Gemini API.

1.  **API Key**: The application is designed to fetch the API key from an environment variable named `API_KEY`. Ensure this variable is set in your execution environment.

    ```
    process.env.API_KEY
    ```

    The application **does not** provide a UI for entering the key; it must be available in the environment upon startup.

2.  **Open `index.html`**: Simply open the `index.html` file in a modern web browser.

## File Structure

-   `index.html`: The main entry point of the application. It defines the structure of the UI.
-   `index.tsx`: The core application logic, written in TypeScript. It handles state management, UI rendering, event handling, and communication with the Gemini API.
-   `index.css`: Contains all the styles for the application, defining its visual appearance and layout.
-   `lenses.ts`: A dedicated data file that stores the definitions for all conceptual lenses, their sub-codes, and analytical prompts. This separates the application's core data from its logic.
-   `README.md`: This file.
