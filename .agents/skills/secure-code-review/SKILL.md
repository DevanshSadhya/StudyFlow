---
name: secure-code-review
description: >-
  Performs a focused, security-conscious code review of frontend or full-stack features.
  Use this skill when auditing changes, reviewing PRs, assessing client-side data
  handling, checking DOM injection risks, or evaluating overall application security posture.
---

# Secure Code Review Workflow

This skill defines the process for performing security-focused code reviews. It emphasizes practical defenses, explains security boundaries clearly in accessible language, and adheres to strict honesty regarding security claims.

## Core Security Posture

- **No Absolute Security**: Never claim an application is "100% secure" or "completely safe." Security is a continuous process of risk management and defense-in-depth, not a permanent binary state.
- **Client-Side Boundary Reality**: In a browser-only application without a backend:
  - `localStorage` is accessible to any script running in the same origin and anyone with physical or administrative access to the browser profile.
  - Client-side code and storage cannot enforce true authentication, authorization, tamper resistance, or multi-user confidentiality.
  - Security controls on the frontend focus on input validation, defensive error recovery, and preventing Cross-Site Scripting (XSS).

---

## Review Checklist

When conducting a security review, examine the code against each of the following areas:

### 1. Authentication & Authorization (Where Applicable)
- Check whether sensitive operations assume a trusted caller.
- For client-only apps (like StudyFlow), explicitly note that authorization cannot be reliably enforced without an authoritative backend server.
- Ensure the app does not attempt to simulate authentication, password protection, or cryptographic access control using client-side browser storage.
- If a backend is present, verify that authentication is verified on every protected route and authorization enforces strict ownership checks (never trusting client claims).

### 2. Input Validation & Data Sanitization
- Treat all external input (form fields, URL parameters, file imports, and stored data) as untrusted.
- Validate data types, maximum length (e.g., 200 characters), and empty/whitespace conditions before processing.
- Verify that malformed data is rejected gracefully with friendly feedback.

### 3. DOM Operations & XSS Prevention
- Check how dynamic text is inserted into the DOM.
- Verify the use of safe APIs (`textContent`, `document.createElement`) rather than dangerous properties (`innerHTML`, `outerHTML`, `document.write`).
- Verify that `setAttribute` is used only for benign attributes (such as `id`, `for`, `class`, `type`, `aria-*`). Prohibit setting executable URL schemes (e.g., `href="javascript:..."`, `src="javascript:..."`) or inline event handlers (`onclick`). Require context-appropriate validation for dynamic attribute values.
- Ensure no execution of user-supplied content via `eval()`, `Function()`, `setTimeout(string)`, or inline event attributes.

### 4. Secrets & Sensitive Information
- Verify that no API keys, tokens, passwords, private endpoints, or personal identifying data are hardcoded or written to `localStorage`.
- Ensure error messages and console logs do not expose sensitive internal details.

### 5. Dependencies & Third-Party Code
- Confirm that no unvetted external scripts, CDNs, or npm libraries have been introduced.
- Emphasize the principle of least privilege regarding external resources.
- Preserve the project constraint of vanilla HTML/CSS/JS unless explicitly approved.

### 6. Error Handling & State Resilience
- Verify that JSON parsing (`JSON.parse`) and storage access are wrapped in defensive error handling (`try / catch`).
- Validate data schemas using predicate functions (e.g., `isValidTask`) to prevent corrupted objects from crashing the application.
- Ensure storage failures (e.g., private browsing mode quota limits) fall back gracefully to in-memory state.

### 7. Deployment & Environment Configuration
- Review relevant browser security policies (e.g., Content Security Policy headers if configured, secure origins/HTTPS expectations).
- Check that links to external resources use `rel="noopener noreferrer"` where appropriate.

---

## Findings Report Structure

Report findings using this clear, actionable structure:

````markdown
### Summary of Findings
[Brief overview of the review scope and key takeaways.]

### Detailed Findings

#### [Finding Title]
- **Severity**: Critical | High | Medium | Low | Informational
- **Evidence**: [File path and line numbers with code snippet]
- **Impact**: [What can happen if this issue is triggered or exploited]
- **Recommended Fix**: [Concrete, beginner-friendly instructions or code example]

### Client-Side Boundary Context
[Clarify which security protections require a backend and cannot be enforced in the browser alone.]

### Residual Risk & Limitations
[State untested areas, environment dependencies, and remaining risks. Never claim complete security.]
````
