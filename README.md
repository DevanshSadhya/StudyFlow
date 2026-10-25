# StudyFlow — Student Task Manager

A lightweight, responsive To-Do List web application built with HTML, CSS, and vanilla JavaScript. StudyFlow helps students organize their study tasks with a simple interface and browser-based persistence.

## Features

- **Task management:** Add, complete, reactivate, and delete tasks.
- **Persistent storage:** Saves tasks in browser `localStorage` so they remain after a page refresh when storage is available.
- **Input validation:** Rejects empty tasks and enforces a 200-character limit.
- **Safe DOM rendering:** Uses DOM APIs and `textContent` to display task text safely.
- **Responsive design:** Supports mobile and desktop layouts.
- **Accessibility:** Includes keyboard navigation, visible focus indicators, and screen-reader announcements.
- **Defensive storage handling:** Handles malformed stored data and reports storage failures.
- **No dependencies:** Built without frontend frameworks, external libraries, or a backend.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Browser `localStorage`
- Git and GitHub
- Google Antigravity for AI-assisted development

## Getting Started

### Requirements

A modern web browser such as Chrome, Brave, Firefox, or Edge. No package installation or build tools are required.

### Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/DevanshSadhya/StudyFlow.git
   ```

2. Open the project folder:

   ```bash
   cd StudyFlow
   ```

3. Open `index.html` in your browser.

Alternatively, open `index.html` directly from the project folder.

## Project Structure

```text
StudyFlow/
├── index.html
├── style.css
├── script.js
├── .gitignore
└── .agents/
    ├── rules/
    │   └── studyflow.md
    └── skills/
        ├── plan-feature/
        │   └── SKILL.md
        ├── secure-code-review/
        │   └── SKILL.md
        └── test-feature/
            └── SKILL.md
```

## Security and Privacy

StudyFlow is a browser-only educational project.

- Task text is rendered using safe DOM APIs rather than parsing user input as HTML.
- Input is validated before tasks are added.
- Stored task data is checked and normalized when loaded.
- Storage errors are handled so the application can respond gracefully.

**Important limitations:**

- `localStorage` is not encrypted. Do not store passwords, authentication tokens, or sensitive personal information.
- Tasks are stored in the current browser profile; they do not synchronize across devices.
- Browser storage may be cleared or unavailable, which can result in data loss.
- Client-side checks are not a substitute for server-side security in applications that handle accounts or sensitive data.

## Testing

The project's reported test results include:

- **23 automated tests passed**, with zero failures reported.
- Input validation and character-boundary checks.
- Task creation, completion, deletion, and persistence.
- HTML injection handling and corrupted-storage scenarios.
- Duplicate and malformed task IDs.
- Keyboard focus restoration and storage-failure handling.
- Responsive CSS checks and manual layout verification.

Some accessibility and physical-device behaviors may vary by browser, operating system, and assistive technology. Test results describe the checks performed; they do not guarantee the absence of all defects.

## AI-Assisted Development Workflow

StudyFlow was developed using a plan-first workflow in Google Antigravity.

The `.agents/` directory contains project-specific instructions and skills for:

- **`plan-feature`** — Plan changes and define acceptance criteria before implementation.
- **`secure-code-review`** — Review the code for security and reliability issues.
- **`test-feature`** — Verify functionality and report test results.

The workflow emphasizes reviewing changes, preserving existing functionality, and testing before considering a feature complete.

## Future Improvements

Potential future enhancements include:

- Optional Content Security Policy (CSP), after compatibility testing.
- Additional real-browser and assistive-technology testing.
- Task editing, priorities, and due dates.
- Improved automated browser testing.

These are potential improvements, not features currently promised by this version.

## License

No license has been specified yet. Unless a license is added, others should not assume that they have permission to redistribute or modify this project.

---

**Repository:** [DevanshSadhya/StudyFlow](https://github.com/DevanshSadhya/StudyFlow)
