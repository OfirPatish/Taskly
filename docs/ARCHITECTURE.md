# Architecture

## Stack

React 19, TypeScript, Vite 7, Chakra UI v3, Motion, next-themes, react-icons (Lucide)

## Structure

```
src/
├── main.tsx, App.tsx, index.css, theme.ts
├── types/, utils/, hooks/
└── components/
    ├── error/    ErrorBoundary, ErrorFallback
    ├── header/    Header, StatItem
    ├── layout/   TodoPage, Footer
    ├── todo/     TodoForm, TodoItem, TodoList, TodoFilters, EmptyState
    └── ui/       Provider, Toaster, ColorModeButton, Keybind, Tooltip
```

## Paths

`@/*` → `./src/*`

## Breakpoints

sm 480px · md 768px · lg 1024px
