---
trigger: always_on
description: "StudyFlow project constraints, architecture, coding standards, and secure development requirements."
---

# StudyFlow Project Rules

## Project Scope
- This is a beginner-friendly student task manager.
- Use only HTML, CSS, and vanilla JavaScript.
- Do not introduce frameworks, npm packages, or a backend without my approval.
- Preserve the existing project structure and working functionality.

## Development Workflow
- Inspect relevant existing files before proposing changes.
- Explain the plan and wait for my approval before implementing a new feature or making significant changes.
- Make small, focused changes.
- Explain each modified file and how to run the application.

## Security
- Treat task text as untrusted input.
- Display task text using textContent or other safe DOM APIs; do not inject user-provided task text through innerHTML.
- Do not use eval or execute task content as code.
- Handle malformed localStorage data without crashing.
- Do not store passwords, authentication tokens, or sensitive personal information in localStorage.
- Do not claim browser-only storage provides server-side security or multi-user access control.

## Testing
- Test adding, completing, deleting, and restoring tasks after refresh.
- Test empty input, unusual characters, and malformed stored data.
- Report which tests were actually executed and their results.
- Explain any untested behavior and known limitations.

## Change Safety
- Do not delete or overwrite existing files without explicit approval.
- Do not deploy or perform destructive operations without explicit approval.
