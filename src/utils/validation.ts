import type { TodoValidationResult } from "@/types/todo";

const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

export const validateTodoText = (
  text: string,
  existingTexts: string[] = []
): TodoValidationResult => {
  const trimmed = text.trim();

  if (trimmed.length < MIN_LENGTH) {
    return {
      valid: false,
      error: "Task cannot be empty",
    };
  }

  if (trimmed.length > MAX_LENGTH) {
    return {
      valid: false,
      error: `Task must be ${MAX_LENGTH} characters or less`,
    };
  }

  const isDuplicate = existingTexts.some(
    (existing) => existing.trim().toLowerCase() === trimmed.toLowerCase()
  );

  if (isDuplicate) {
    return {
      valid: false,
      error: "This task already exists",
    };
  }

  return { valid: true };
};

export const TODO_MAX_LENGTH = MAX_LENGTH;
