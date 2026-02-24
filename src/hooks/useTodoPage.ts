import { useCallback } from "react";
import { useTodos } from "./useTodos";
import { toaster } from "@/components/ui/toaster-instance";

export const useTodoPage = () => {
  const { clearCompleted, ...rest } = useTodos();

  const handleAddSuccess = useCallback(() => {
    toaster.create({
      title: "Task added",
      type: "success",
      duration: 2000,
    });
  }, []);

  const handleAddError = useCallback((message: string) => {
    toaster.create({
      title: "Could not add task",
      description: message,
      type: "error",
      duration: 4000,
    });
  }, []);

  const handleClearCompleted = useCallback(() => {
    const count = clearCompleted();
    if (count > 0) {
      toaster.create({
        title: "Cleared completed",
        description: `${count} task${count !== 1 ? "s" : ""} removed`,
        type: "success",
        duration: 2000,
      });
    }
  }, [clearCompleted]);

  return {
    ...rest,
    clearCompleted,
    handleAddSuccess,
    handleAddError,
    handleClearCompleted,
  };
};
