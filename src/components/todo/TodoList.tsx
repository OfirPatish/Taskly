import {
  Box,
  Button,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  Stack,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import type { Todo, TodoFilter } from "@/types/todo";
import { TodoItem } from "./TodoItem";
import { EmptyState } from "./EmptyState";

interface TodoListProps {
  todos: Todo[];
  filter: TodoFilter;
  searchQuery?: string;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Todo, "text" | "priority">>) => void;
  onDelete: (id: string) => void;
}

export const TodoList = ({
  todos,
  filter,
  searchQuery,
  onToggle,
  onUpdate,
  onDelete,
}: TodoListProps) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDeleteConfirm = (id: string) => setDeleteConfirmId(id);

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      onDelete(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleOpenChange = (details: { open: boolean }) => {
    if (!details.open) setDeleteConfirmId(null);
  };

  const todoTextsMap = useMemo(() => {
    const allTexts = todos.map((t) => t.text);
    const map = new Map<string, string[]>();
    for (const todo of todos) {
      map.set(
        todo.id,
        allTexts.filter((_, i) => todos[i].id !== todo.id)
      );
    }
    return map;
  }, [todos]);

  const deleteTarget = deleteConfirmId
    ? todos.find((t) => t.id === deleteConfirmId)
    : null;

  const cardStyles = {
    bg: "bg.panel",
    borderRadius: "2xl",
    borderWidth: "1px",
    borderColor: "border",
    overflow: "hidden",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.06)",
    transition: "box-shadow 0.2s, border-color 0.2s",
    _hover: {
      boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.08)",
    },
    _dark: {
      boxShadow: "0 1px 2px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.15)",
      _hover: {
        boxShadow: "0 2px 4px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.2)",
      },
    },
  };

  if (todos.length === 0) {
    return (
      <Box {...cardStyles}>
        <EmptyState filter={filter} searchQuery={searchQuery} />
      </Box>
    );
  }

  return (
    <>
      <Box {...cardStyles}>
        <Stack
          divideY="1px"
          divideColor="border"
          role="list"
          aria-label="Task list"
        >
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              otherTexts={todoTextsMap.get(todo.id) ?? []}
              onToggle={onToggle}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onDeleteConfirm={handleDeleteConfirm}
            />
          ))}
        </Stack>
      </Box>

      <DialogRoot
        open={!!deleteConfirmId}
        onOpenChange={handleOpenChange}
        role="alertdialog"
        motionPreset="scale"
      >
        <DialogBackdrop />
        <DialogPositioner
          padding={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <DialogContent
            borderRadius="2xl"
            width="auto"
            maxW="min(400px, calc(100vw - 2rem))"
            mx="auto"
            display="flex"
            flexDirection="column"
          >
            <DialogHeader>
              <DialogTitle>Delete task?</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <DialogDescription>
                {deleteTarget
                  ? `"${deleteTarget.text.length > 50 ? deleteTarget.text.slice(0, 50) + "..." : deleteTarget.text}" will be permanently removed. This action cannot be undone.`
                  : "This action cannot be undone."}
              </DialogDescription>
            </DialogBody>
            <DialogFooter gap={2}>
              <Button
                variant="outline"
                borderRadius="xl"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </Button>
              <Button
                colorPalette="red"
                borderRadius="xl"
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
            </DialogFooter>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogPositioner>
      </DialogRoot>
    </>
  );
};
