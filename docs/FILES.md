# Files

| File | Purpose |
| ---- | ------- |
| main.tsx | Entry, providers |
| App.tsx | ErrorBoundary + TodoPage |
| theme.ts | Chakra theme, teal accent |
| index.css | Reset, safe areas |
| types/todo.ts | Todo, TodoFilter, TodoPriority |
| utils/validation.ts | validateTodoText, TODO_MAX_LENGTH |
| utils/storage.ts | loadTodos, saveTodos |
| hooks/useTodos.ts | Todo state, filter, sort, search |
| hooks/useTodoPage.ts | useTodos + toaster handlers |
| hooks/useFocusTodoInput.ts | mod+K focus ref |
| components/error/* | ErrorBoundary, ErrorFallback |
| components/header/* | Header, StatItem |
| components/layout/* | TodoPage, Footer |
| components/todo/* | TodoForm, TodoItem, TodoList, TodoFilters, EmptyState |
| components/ui/* | Provider, Toaster, ColorModeButton, Keybind, Tooltip |
