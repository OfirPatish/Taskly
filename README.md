# Taskly

A focused todo app. Add, edit, delete tasks; filter by status; keyboard-driven. React, TypeScript, Vite, Chakra UI.

**Live:** [opdev-taskly.vercel.app](https://opdev-taskly.vercel.app/)  
**GitHub:** [github.com/OfirPatish/taskly](https://github.com/OfirPatish/taskly)

## Highlights

- **Task CRUD** — Add, edit, delete; double-click to edit inline
- **Filters** — All / Active / Done, search, sort toggle
- **Keyboard shortcuts** — ⌘K / Ctrl+K focus add input, Enter to add/save, Shift+Enter for new line
- **Progress** — Total, active, done counts; progress ring in header
- **Theme** — Light/dark mode (next-themes, persisted)
- **Polish** — Chakra UI v3, Motion animations, error boundary, toasts

## Stack

React 19 · TypeScript · Vite 7 · Chakra UI v3 · Motion · next-themes · react-icons

## Quick start

1. **Clone & install** — `git clone https://github.com/OfirPatish/taskly.git && cd taskly && npm install`
2. **Run** — `npm run dev` → [http://localhost:5173](http://localhost:5173)

## Commands

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run check` | Lint + type-check |

## Project structure

```
src/
├── main.tsx, App.tsx, index.css, theme.ts
├── types/, utils/, hooks/
└── components/
    ├── error/    ErrorBoundary, ErrorFallback
    ├── header/   Header, StatItem
    ├── layout/   TodoPage, Footer
    ├── todo/     TodoForm, TodoItem, TodoList, TodoFilters, EmptyState
    └── ui/       Provider, Toaster, ColorModeButton, Keybind, Tooltip
```

## Shortcuts

| Shortcut | Action |
| -------- | ------ |
| `⌘K` / `Ctrl+K` | Focus add input |
| `Enter` | Add task / Save edit |
| `Shift+Enter` | New line in task text |

Keybinds show **⌘** on Mac, **Ctrl** on Windows/Linux.

## Docs

| Doc | Purpose |
| --- | ------- |
| [docs/README.md](docs/README.md) | Doc hub |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Stack, structure, paths |
| [docs/COMPONENTS.md](docs/COMPONENTS.md) | Component roles |
| [docs/LOGIC.md](docs/LOGIC.md) | State, validation, shortcuts |
| [docs/UI.md](docs/UI.md) | Theme, keybinds |
| [docs/FILES.md](docs/FILES.md) | File reference |

---

**Status:** Production ready.
