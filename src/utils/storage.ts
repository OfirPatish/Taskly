import type { Todo } from "@/types/todo";

const STORAGE_KEY = "taskly-todos";

export interface StorageResult<T> {
  data: T;
  error?: string;
}

export const loadTodos = (): StorageResult<Todo[]> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { data: [] };
    }

    const parsed = JSON.parse(stored) as unknown;

    if (!Array.isArray(parsed)) {
      return { data: [], error: "Invalid data format" };
    }

    const validTodos = parsed.filter(
      (item): item is Todo =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.text === "string" &&
        typeof item.completed === "boolean" &&
        typeof item.createdAt === "number"
    );

    const todos = validTodos.map((todo) => ({
      ...todo,
      priority: (todo.priority as Todo["priority"]) || "medium",
      updatedAt: todo.updatedAt ?? todo.createdAt,
    }));

    return { data: todos };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load todos";
    return { data: [], error: message };
  }
};

export const saveTodos = (todos: Todo[]): StorageResult<void> => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return { data: undefined };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save todos";
    return { data: undefined, error: message };
  }
};
