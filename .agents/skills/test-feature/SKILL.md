---
name: test-feature
description: >-
  Derives test cases from requirements and acceptance criteria, executes available
  tests when authorized, and reports verified results. Use this skill when verifying
  features, validating bug fixes, testing edge cases, or ensuring regression safety.
---

# Feature Testing Workflow

This skill defines the process for deriving, organizing, executing, and reporting tests for features and bug fixes. It ensures that testing is thorough, honest, and directly tied to project requirements.

## Core Testing Principles

1. **Derived from Requirements**: Formulate test cases directly from user requirements, acceptance criteria, and edge cases.
2. **Honesty in Reporting**: Never report that a test passed unless it was actually executed and its result observed.
3. **Explicit Distinction**: Clearly distinguish tests actually executed from tests not run, skipped, or assumed.

---

## Test Scenario Categories

Design tests covering the following essential categories:

### 1. Normal Behavior (Happy Path)
- Verify primary use cases work as intended (e.g., adding a valid task, checking off a task, deleting a task).
- Check that UI counters, empty states, and visual cues update correctly.

### 2. Edge Cases & Boundary Values
- **Character boundaries**: Maximum length inputs (e.g., exactly 200 characters) and minimum length inputs (1 character).
- **Special characters & symbols**: Unicode characters, emojis, quotes (`"`, `'`), and HTML-like strings (`<script>alert(1)</script>`, `<b>bold</b>`).
- **Whitespace handling**: Leading, trailing, or all-whitespace entries.

### 3. Invalid Inputs & Corrupted State
- Empty submissions (submitting without typing).
- Missing DOM elements or uninitialized state.
- Malformed data in `localStorage` (e.g., corrupted JSON, non-array types, missing `id` or `text` fields).

### 4. Regressions & Persistence
- Reloading the page to confirm state persists accurately across browser sessions.
- Adding multiple items, deleting intermediate items, and verifying index integrity.
- Verifying existing capabilities remain operational after any new change.

### 5. Accessibility & Usability
- Keyboard accessibility (form submission with Enter key, focus management).
- Screen reader announcements via live regions (`aria-live="polite"`).

---

## Test Execution & Reporting

### Execution Protocol & Safety
- Verify file existence before testing.
- Run automated test scripts or browser checks only when authorized.
- For manual or browser-driven testing in vanilla environments, provide explicit steps for the tester to follow.

### Results Report Format

Present test results in this structured format:

````markdown
### Test Execution Summary
- **Total Tests Planned**: [Count]
- **Executed**: [Count]
- **Passed**: [Count]
- **Failed**: [Count]
- **Skipped / Untested**: [Count]

### Detailed Test Matrix

| ID | Scenario | Category | Expected Outcome | Observed Result | Status |
|:---|:---|:---|:---|:---|:---:|
| TC-01 | [Description] | Normal | [Expected] | [Observed] | PASS / FAIL |
| TC-02 | [Description] | Edge Case | [Expected] | [Observed] | PASS / FAIL |
| TC-03 | [Description] | Invalid Input | [Expected] | [Observed] | PASS / FAIL |
| TC-04 | [Description] | Regression | [Expected] | [Observed] | PASS / FAIL |

### Tests Not Run & Skipped
- **[Test ID / Description]**: [Reason not run, e.g., requires real assistive technology or external browser session]

### Observations & Defect Details
[Detail any unexpected behavior, console errors, or failed assertions.]

### Untested Scenarios & Limitations
[Explicitly list any behavior that could not be verified in this environment, e.g., specific assistive technologies or cross-browser rendering differences. Never claim 100% security or zero bugs.]
````
