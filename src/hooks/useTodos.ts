import { useState, useCallback, useEffect, useMemo } from "react";
import type { Todo, TodoFilter, TodoPriority, TodoSortOption } from "@/types/todo";
import { PRIORITY_ORDER } from "@/types/todo";
import { loadTodos, saveTodos } from "@/utils/storage";
import { validateTodoText } from "@/utils/validation";

const generateId = () => crypto.randomUUID();

const sortTodos = (todos: Todo[], sort: TodoSortOption): Todo[] => {
  const sorted = [...todos];

  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => b.createdAt - a.createdAt);
    case "oldest":
      return sorted.sort((a, b) => a.createdAt - b.createdAt);
    case "priority":
      return sorted.sort(
        (a, b) =>
          PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] ||
          b.createdAt - a.createdAt
      );
    case "alphabetical":
      return sorted.sort((a, b) =>
        a.text.localeCompare(b.text, undefined, { sensitivity: "base" })
      );
    default:
      return sorted;
  }
};

export interface UseTodosReturn {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
  sort: TodoSortOption;
  setSort: (sort: TodoSortOption) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addTodo: (text: string, priority?: TodoPriority) => { success: boolean; error?: string };
  updateTodo: (id: string, updates: Partial<Pick<Todo, "text" | "priority">>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => number;
  activeCount: number;
  completedCount: number;
  storageError: string | null;
}

const getInitialState = () => {
  const { data, error } = loadTodos();
  return {
    todos: data,
    storageError: error ?? null,
  };
};

export const useTodos = (): UseTodosReturn => {
  const [state, setState] = useState(getInitialState);
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [sort, setSort] = useState<TodoSortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const { todos: todosState, storageError } = state;

  const setTodos = useCallback((updater: React.SetStateAction<Todo[]>) => {
    setState((prev) => ({
      ...prev,
      todos:
        typeof updater === "function" ? updater(prev.todos) : updater,
    }));
  }, []);

  useEffect(() => {
    const { error } = saveTodos(todosState);
    queueMicrotask(() =>
      setState((prev) => ({ ...prev, storageError: error ?? null }))
    );
  }, [todosState]);

  const todos = todosState;

  const activeCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  const completedCount = useMemo(
    () => todos.filter((t) => t.completed).length,
    [todos]
  );

  const filteredTodos = useMemo(() => {
    let result = todos;

    if (filter === "active") result = result.filter((t) => !t.completed);
    if (filter === "completed") result = result.filter((t) => t.completed);

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((t) => t.text.toLowerCase().includes(q));
    }

    return sortTodos(result, sort);
  }, [todos, filter, sort, searchQuery]);

  const addTodo = useCallback(
    (text: string, priority: TodoPriority = "medium"): { success: boolean; error?: string } => {
      const trimmed = text.trim();
      let result: { success: boolean; error?: string } = { success: false };

      setTodos((prev) => {
        const existingTexts = prev.map((t) => t.text);
        const validation = validateTodoText(trimmed, existingTexts);

        if (!validation.valid) {
          result = { success: false, error: validation.error };
          return prev;
        }

        const now = Date.now();
        result = { success: true };
        return [
          ...prev,
          {
            id: generateId(),
            text: trimmed,
            completed: false,
            priority,
            createdAt: now,
            updatedAt: now,
          },
        ];
      });

      return result;
    },
    [setTodos]
  );

  const updateTodo = useCallback(
    (id: string, updates: Partial<Pick<Todo, "text" | "priority">>) => {
      setTodos((prev) =>
        prev.map((todo) => {
          if (todo.id !== id) return todo;

          if (updates.text !== undefined) {
            const others = prev.filter((t) => t.id !== id).map((t) => t.text);
            const validation = validateTodoText(updates.text, others);
            if (!validation.valid) return todo;
          }

          return {
            ...todo,
            ...updates,
            ...(updates.text !== undefined && { text: updates.text.trim() }),
            updatedAt: Date.now(),
          };
        })
      );
    },
    [setTodos]
  );

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: Date.now() }
          : todo
      )
    );
  }, [setTodos]);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, [setTodos]);

  const clearCompleted = useCallback((): number => {
    let count = 0;
    setTodos((prev) => {
      const active = prev.filter((t) => !t.completed);
      count = prev.length - active.length;
      return active;
    });
    return count;
  }, [setTodos]);

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    sort,
    setSort,
    searchQuery,
    setSearchQuery,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    activeCount,
    completedCount,
    storageError,
  };
};
