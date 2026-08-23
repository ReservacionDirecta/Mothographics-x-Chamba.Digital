# AGENTS.md — Autonomous Circular Development Workflow

This file defines how the agent operates autonomously in this codebase.
The agent follows a CIRCULAR workflow: understand → plan → execute → verify → iterate.
Every task MUST complete the full circle before reporting done.

---

## Core Principle: The Loop

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   UNDERSTAND → PLAN → EXECUTE → VERIFY → ITERATE│
│       ↑                                 │       │
│       └─────────────────────────────────┘       │
│                                                 │
│   The loop only stops when:                     │
│   1. All verification passes                    │
│   2. User explicitly says to stop               │
│   3. A blocker requires human decision          │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Phase 1: UNDERSTAND

Before writing ANY code:

1. **Read the task** — What is the user asking? Parse intent, not just words.
2. **Read context** — Open relevant files. Understand existing patterns.
3. **Identify scope** — Is this a 1-file fix or a 10-file refactor?
4. **Check dependencies** — Will this change affect other components?

Output: A mental model of what needs to happen and where.

If ambiguous, ask ONE clarifying question. Don't ask 5.

---

## Phase 2: PLAN

Before executing:

1. **List every file** that needs to change (use glob/grep to find them).
2. **List the order** of changes (dependencies first).
3. **List verification steps** — How will you know it works?
4. **Estimate risk** — Low (1 file, no logic change) vs High (multiple files, logic change).

For LOW risk tasks: plan internally, execute directly.
For HIGH risk tasks: present plan to user, wait for approval.

---

## Phase 3: EXECUTE

When coding:

1. **Read before edit** — Always Read a file before modifying it. No exceptions.
2. **One logical change per edit** — Don't bundle unrelated changes.
3. **Follow existing patterns** — Check neighboring files for code style.
4. **Use the project's conventions** — See "Code Conventions" below.
5. **Don't introduce new dependencies** without checking if one already exists.

---

## Phase 4: VERIFY

After EVERY code change, run verification in this order:

```
1. npx tsc --noEmit          # TypeScript check
2. npx vite build            # Build check (if tsc passes)
3. Manual review             # Read the diff, check logic
```

If ANY step fails:
- Read the error message carefully
- Fix the issue
- Re-run verification from step 1
- Do NOT skip steps

If verification passes, proceed. If it fails 3 times, stop and ask user.

---

## Phase 5: ITERATE

After verification passes:

1. **Review the diff** — Does the change do what was asked?
2. **Check for side effects** — Did anything break elsewhere?
3. **Consider edge cases** — What happens with empty data, errors, etc.?
4. **If the task is complete** — Report what was done, what was verified.
5. **If more work is needed** — Go back to Phase 2 with new context.

---

## When to Ask vs When to Act

### ACT autonomously (no question needed):
- Fixing a TypeScript error
- Adding a missing import
- Refactoring code that follows an obvious pattern
- Running verification commands
- Fixing a typo or formatting issue
- Adding a component that matches an existing template
- Updating a file based on clear, specific instructions

### ASK the user first:
- Changing public API or component interfaces
- Adding new dependencies
- Modifying business logic or pricing
- Changing the routing structure
- Altering the visual design (colors, layout) beyond minor tweaks
- Any change that affects multiple files with no clear pattern to follow
- Deleting code that might be intentional

### Default: If you're unsure, ACT and explain what you did.
The user can always revert. Asking too many questions breaks flow.

---

## Error Recovery Protocol

When something breaks:

1. **Read the full error** — Not just the last line.
2. **Identify the root cause** — The error message often tells you exactly what's wrong.
3. **Fix the cause, not the symptom** — If TypeScript says "Property X does not exist on type Y", check the type definition, don't just add `as any`.
4. **Re-verify** — Run the check again after fixing.
5. **If stuck after 2 attempts** — Search the codebase for similar patterns (grep).
6. **If still stuck** — Ask the user with: what you tried, what failed, what you think the issue is.

---

## Code Conventions (This Project)

- **Styling**: Tailwind CSS v4 with CSS variables (`bg-bg`, `text-accent`, `text-muted`)
- **Animations**: Framer Motion (`motion/react`), not Remotion for inline components
- **Components**: Functional components with TypeScript, no class components
- **State**: `useState` for local, URL params for shared, no global state library
- **Icons**: Lucide React exclusively
- **Imports**: Path alias `@/*` → project root
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Exports**: Named exports for components, default for pages
- **File structure**: Components in `src/components/`, pages in `src/pages/`

---

## Task Completion Checklist

Before saying "done", verify ALL of these:

- [ ] `npx tsc --noEmit` passes
- [ ] `npx vite build` passes (if applicable)
- [ ] The change does what was asked
- [ ] No unrelated changes were made
- [ ] No secrets or keys were committed
- [ ] New files are in the correct directory
- [ ] Imports are correct and not duplicated

---

## Circular Workflow Example

```
User: "Add a loading spinner to the contact form"

1. UNDERSTAND:
   - Find ContactForm component → src/App.tsx line ~2145
   - It already has a sending state with a spinner
   - Need to verify: is the existing spinner sufficient?

2. PLAN:
   - Check if the spinner is already implemented
   - If yes, inform user. If no, add it following existing patterns.
   - Files: src/App.tsx

3. EXECUTE:
   - Read the ContactForm code
   - Found: it already has a spinner (line ~2348)
   - No code changes needed

4. VERIFY:
   - tsc --noEmit → passes
   - Build → passes
   - Logic check → spinner exists and works

5. ITERATE:
   - Task complete. Inform user that the spinner already exists.
```

---

## Anti-Patterns (DO NOT DO)

- ❌ Ask "what should I do?" when the task is clear
- ❌ Make changes without reading the file first
- ❌ Skip TypeScript/build verification
- ❌ Commit without being asked
- ❌ Add comments unless asked
- ❌ Create documentation files unless asked
- ❌ Refactor code that wasn't part of the task
- ❌ Use `any` type to bypass TypeScript errors
- ❌ Assume a library is available without checking package.json
- ❌ Change multiple unrelated files in one edit
