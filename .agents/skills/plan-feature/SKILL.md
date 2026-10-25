---
name: plan-feature
description: >-
  Inspects the existing codebase and creates a structured implementation plan
  for a proposed feature or modification before touching any code. Use this skill
  when the user requests a new feature, behavior change, or architectural proposal
  that requires upfront planning, architecture alignment, measurable acceptance criteria,
  comprehensive test planning, practical security review, and explicit approval.
---

# Feature Planning Workflow

This skill guides the planning of new features, bug fixes, or enhancements for StudyFlow. It enforces a disciplined, plan-first workflow that aligns with project constraints, bakes in security from the start, and ensures verifiable testing.

## Core Planning Principles

1. **Verify & Inspect Before Proposing**:
   - Check the actual existence of relevant files on disk before assuming their presence or contents.
   - If a required file is missing, report it immediately and adapt the plan accordingly rather than inventing or hallucinating its contents.
   - Read the existing files (`index.html`, `script.js`, `style.css`, and `.agents/rules/studyflow.md`) to understand the current architecture and state management.
2. **Preserve Technology Constraints**:
   - Keep the application beginner-friendly, maintainable, and lightweight.
   - Use strictly HTML, CSS, and vanilla JavaScript.
   - Do not introduce npm packages, build tools, external libraries, frontend frameworks, or backend services without explicit user approval.
   - Maintain existing working functionality and coding patterns (e.g., standard IIFE closures, semantic HTML, and clean CSS).
3. **Strict Approval Gate**:
   - Present the plan in full and immediately pause execution.
   - Never create, edit, move, or delete any project files until the user explicitly reviews and approves the plan.

---

## Step-by-Step Planning Procedure

### Step 1: Codebase Verification & Inspection
- Verify that expected project files exist on disk using read or listing tools.
- Read existing implementations to understand:
  - How state is represented in memory (e.g., the `tasks` array in `script.js`).
  - How persistence and serialization are managed (e.g., `localStorage`).
  - How UI elements are structured, styled, and updated in `index.html` and `style.css`.
- If an expected file is absent, explicitly document its absence and plan for its creation or alternative handling.

### Step 2: Architecture & Constraints Check
- Confirm that the proposed solution works cleanly with standard browser APIs.
- Identify the target architecture:
  - **Browser-Only (StudyFlow Default)**: All state and logic remain local to the browser; storage is unencrypted client `localStorage`.
  - **Full-Stack / Backend (If explicitly introduced later)**: Client communicates with an authoritative server over HTTP/WebSockets.

### Step 3: Architecture-Appropriate Security Review Checklist
Incorporate security considerations directly into the plan:

#### A. For Current Browser-Only Architecture (StudyFlow Default):
- **Safe DOM Rendering & Attribute Handling**:
  - Prohibit inserting untrusted content via `innerHTML`, `outerHTML`, or `document.write`.
  - Prefer safe text APIs (`textContent`) and safe element creation (`document.createElement`).
  - Use `setAttribute` safely and appropriately for benign attributes (such as `id`, `for`, `class`, `type`, `aria-*`). Prohibit setting executable URL schemes (e.g., `href="javascript:..."`, `src="javascript:..."`) or inline event handlers (e.g., `onclick`). Require context-appropriate validation for any attribute populated with dynamic data.
  - Prohibit `eval()`, `new Function()`, or passing strings to `setTimeout`/`setInterval`.
- **Input Validation**:
  - Enforce boundary limits (e.g., trim whitespace, enforce the 200-character limit, reject empty submissions). Treat all external and imported inputs as untrusted.
- **Practical `localStorage` Resilience**:
  - Centralize storage access and parsing (e.g., in dedicated `loadTasks` and `saveTasks` helper routines) wrapped with defensive `try / catch` handling to gracefully capture quota errors, access restrictions, or malformed JSON.
  - Validate data schemas using predicate functions (such as `isValidTask`) to filter out corrupted objects, non-array payloads, or missing keys.
  - Provide a graceful in-memory fallback without requiring every individual read or write operation to be wrapped in a separate `try / catch`.
- **Sensitive Data Limitations**:
  - Never store passwords, authentication tokens, API keys, or private personal data in `localStorage`.
  - Explicitly document that browser storage provides no confidentiality against other scripts on the same origin or users with device access.

#### B. For Full-Stack Architecture (If a Backend is Added Later):
- **Server-Side Authentication**: Enforce verified session or token-based authentication on all protected endpoints.
- **Server-Side Authorization**: Enforce ownership checks on the server to ensure users can only access their own resources; never trust client-supplied identity claims.
- **API Boundary Validation**: Validate, sanitize, and parameterize all incoming requests and database queries on the server.
- **Secret Management**: Keep database credentials, API keys, and environment variables strictly on the server, never exposed in client bundles.

### Step 4: Formulate the Feature Plan
Present the plan clearly using this structured template:

````markdown
### 1. Goal & Feature Overview
[Explain in beginner-friendly terms what the feature accomplishes and why.]

### 2. File Verification & Baseline Status
- Verified existing files: [List files verified on disk]
- Missing or adapted files: [List any missing files and how the plan accommodates them]

### 3. Assumptions & Technology Constraints
- HTML, CSS, and vanilla JavaScript only.
- No external packages, libraries, frameworks, or backend services without explicit approval.
- [Any specific assumptions regarding browser support or user interactions.]

### 4. Implementation Steps
- Step 1: [Specific markup changes in index.html]
- Step 2: [Specific logic, event listeners, or helper functions in script.js]
- Step 3: [Styling or accessibility updates in style.css]

### 5. Files Affected
- `path/to/file`: [Specific functions, elements, or CSS classes to be modified or created]

### 6. Security Checklist (Architecture-Specific)
- [ ] Safe DOM Rendering: Dynamic content rendered via `textContent` or `createElement`; no `innerHTML`.
- [ ] Safe Attribute Handling: `setAttribute` restricted to safe attributes; no executable schemes or inline handlers.
- [ ] Input Validation: Boundary limits, whitespace trimming, and empty input handling defined.
- [ ] Practical Storage Resilience: Storage reads/writes centralized with parsing guards, schema validation, and fallback state.
- [ ] Sensitive Data: No passwords, tokens, or private credentials stored in client storage.
- [ ] Backend Controls: [Mark N/A for browser-only, or specify server-side auth/authorization if backend applies].

### 7. Measurable Acceptance Criteria
- [ ] **AC-1**: [Specific, measurable criterion, e.g., "Submitting a valid 10-character task adds it to the list and increments the counter by 1."]
- [ ] **AC-2**: [Specific criterion, e.g., "Submitting an empty or whitespace-only input displays an alert and leaves the task list unchanged."]
- [ ] **AC-3**: [Specific criterion, e.g., "Tasks persist in their current state across page reloads."]

### 8. Comprehensive Test Plan
- **Positive Tests (Happy Path)**:
  - Test valid input flows, UI state changes, and expected user journeys.
- **Negative Tests (Invalid Inputs & Failures)**:
  - Test empty input, whitespace-only input, input exceeding maximum length (200+ characters), and invalid actions.
- **Edge-Case Tests (Boundaries & Special Data)**:
  - Test boundary lengths (1 character, exactly 200 characters).
  - Test special characters, HTML injection strings (`<script>alert(1)</script>`, `<b>bold</b>`), Unicode, and emojis.
  - Test corrupted or unexpected storage payloads.
- **Regression Tests (Existing Functionality)**:
  - Verify existing tasks can still be toggled, rendered, and deleted.
  - Verify empty state toggle and task counter accuracy are preserved.
````

### Step 5: Final Report Requirements (Post-Implementation)
When implementation is complete, the final response must provide a transparent closing report covering:
1. **Changed Files**: Clear summary of what was added, modified, or removed in each file.
2. **Tests Actually Executed & Results**: Specific list of tests run during verification and their observed outcomes. Never claim a test passed unless it was genuinely run and observed.
3. **Tests Not Run**: Specific list of planned tests that were skipped or not run, along with the reason (e.g., requires manual browser interaction or screen reader verification).
4. **Remaining Defects & Known Issues**: Any unresolved bugs, edge-case quirks, or styling nuances discovered during testing.
5. **Security Limitations**: Explicit description of remaining security risks and client-side boundary limitations (never claim an application is "completely secure").
6. **Deployment Blockers & Prerequisites**: Any prerequisites, environment settings, or hosting conditions required before deploying or distributing the changes (or note "None" if purely static).

### Step 6: Explicit Approval Gate
- After presenting the plan, **stop and wait for user approval**.
- Do not run commands that create, edit, move, or delete files until the user explicitly responds with approval to proceed.
