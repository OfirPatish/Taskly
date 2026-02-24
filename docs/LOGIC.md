# Logic

## useTodos

Returns: todos, filteredTodos, filter/setFilter, sort/setSort, searchQuery/setSearchQuery, addTodo, updateTodo, toggleTodo, deleteTodo, clearCompleted, activeCount, completedCount, storageError. Persistence: localStorage.

## useTodoPage

Wraps useTodos + toaster handlers (add success, add error, clear completed).

## useFocusTodoInput

Returns ref for add input. Listens for mod+K (⌘K on Mac, Ctrl+K on Win/Linux) to focus.

## Validation

1–200 chars, no duplicates (case-insensitive). `{ valid, error? }`.

## Storage

Key `taskly-todos`. Load/save JSON with schema check.

## Shortcuts

| Key | Action |
| --- | ------ |
| mod+K | Focus add input |
| Enter | Add / Save edit |
| Shift+Enter | New line |
