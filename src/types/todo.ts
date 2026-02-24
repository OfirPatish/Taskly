export type TodoPriority = "low" | "medium" | "high";

export type TodoSortOption = "newest" | "oldest" | "priority" | "alphabetical";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: TodoPriority;
  createdAt: number;
  updatedAt: number;
}

export type TodoFilter = "all" | "active" | "completed";

export interface TodoValidationResult {
  valid: boolean;
  error?: string;
}

export const PRIORITY_ORDER: Record<TodoPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};
