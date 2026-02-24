import {
  Box,
  Checkbox,
  HStack,
  IconButton,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { motion } from "motion/react";
import { useState, useCallback, useRef } from "react";
import {
  LuPencil,
  LuTrash2,
  LuCheck,
  LuX,
  LuClock,
  LuArrowDown,
  LuMinus,
  LuArrowUp,
} from "react-icons/lu";
import { Tooltip } from "@/components/ui/tooltip";
import type { Todo, TodoPriority } from "@/types/todo";
import { validateTodoText, TODO_MAX_LENGTH } from "@/utils/validation";

interface TodoItemProps {
  todo: Todo;
  otherTexts: string[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Todo, "text" | "priority">>) => void;
  onDelete: (id: string) => void;
  onDeleteConfirm?: (id: string) => void;
}

const PRIORITY_ORDER: TodoPriority[] = ["low", "medium", "high"];
const PRIORITY_CONFIG: Record<
  TodoPriority,
  { label: string; color: string; borderColor: string; icon: React.ReactNode }
> = {
  high: {
    label: "High",
    color: "red",
    borderColor: "red.500",
    icon: <LuArrowUp size={14} />,
  },
  medium: {
    label: "Medium",
    color: "orange",
    borderColor: "orange.500",
    icon: <LuMinus size={14} />,
  },
  low: {
    label: "Low",
    color: "green",
    borderColor: "green.500",
    icon: <LuArrowDown size={14} />,
  },
};

const getNextPriority = (current: TodoPriority): TodoPriority => {
  const i = PRIORITY_ORDER.indexOf(current);
  return PRIORITY_ORDER[(i + 1) % PRIORITY_ORDER.length];
};

const MotionBox = motion.create(Box);

const formatRelativeTime = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
};

export const TodoItem = ({
  todo,
  otherTexts,
  onToggle,
  onUpdate,
  onDelete,
  onDeleteConfirm,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const [editError, setEditError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const config = PRIORITY_CONFIG[todo.priority];

  const handleStartEdit = useCallback(() => {
    setEditValue(todo.text);
    setEditError(null);
    setIsEditing(true);
    setTimeout(() => textareaRef.current?.focus(), 0);
  }, [todo.text]);

  const handleCancelEdit = useCallback(() => {
    setEditValue(todo.text);
    setEditError(null);
    setIsEditing(false);
  }, [todo.text]);

  const handleSaveEdit = useCallback(() => {
    const trimmed = editValue.trim();

    if (trimmed === todo.text) {
      handleCancelEdit();
      return;
    }

    const validation = validateTodoText(trimmed, otherTexts);

    if (!validation.valid) {
      setEditError(validation.error ?? "Invalid");
      return;
    }

    onUpdate(todo.id, { text: trimmed });
    setEditError(null);
    setIsEditing(false);
  }, [editValue, todo.text, todo.id, otherTexts, onUpdate, handleCancelEdit]);

  const handleEditKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") handleCancelEdit();
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSaveEdit();
      }
    },
    [handleSaveEdit, handleCancelEdit]
  );

  const handleDeleteClick = useCallback(() => {
    if (onDeleteConfirm) {
      onDeleteConfirm(todo.id);
    } else {
      onDelete(todo.id);
    }
  }, [todo.id, onDelete, onDeleteConfirm]);

  return (
    <Box
      position="relative"
      px={{ base: 3, sm: 4 }}
      py={{ base: 3, sm: 3.5 }}
      transition="background-color 0.2s"
      _hover={{ bg: "bg.subtle" }}
      borderLeftWidth="3px"
      borderLeftColor={todo.completed ? "gray.300" : config.borderColor}
    >
      {isEditing ? (
        <VStack gap={2} align="stretch" width="100%">
          <Box position="relative" width="100%">
            <Textarea
              ref={textareaRef}
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value);
                setEditError(null);
              }}
              onKeyDown={handleEditKeyDown}
              size="md"
              variant="outline"
              borderRadius="lg"
              borderColor={editError ? "red.500" : "border.emphasized"}
              bg="bg"
              _focusVisible={{
                outline: "2px solid",
                outlineColor: editError ? "red.500" : "accent.500",
              }}
              maxLength={TODO_MAX_LENGTH}
              rows={Math.min(Math.max(2, Math.ceil(editValue.length / 40)), 6)}
              resize="vertical"
              minH="4rem"
              maxH="10rem"
              pr={editValue.length > TODO_MAX_LENGTH * 0.75 ? 16 : 3}
              aria-invalid={!!editError}
              aria-label="Edit task text"
            />
            {editValue.length > TODO_MAX_LENGTH * 0.75 && (
              <Text
                position="absolute"
                right={3}
                bottom={2}
                fontSize="xs"
                color={editValue.length > TODO_MAX_LENGTH ? "red.500" : "fg.muted"}
                fontWeight={editValue.length > TODO_MAX_LENGTH ? "bold" : "normal"}
                pointerEvents="none"
                fontFamily="mono"
              >
                {editValue.length}/{TODO_MAX_LENGTH}
              </Text>
            )}
          </Box>
          <HStack gap={2} justify="flex-end" width="100%">
            <Text fontSize="xs" color="fg.subtle">
              Shift+Enter for new line
            </Text>
            <IconButton
              aria-label="Cancel edit"
              size="sm"
              variant="ghost"
              borderRadius="lg"
              onClick={handleCancelEdit}
              minW={9}
              minH={9}
            >
              <LuX size={16} />
            </IconButton>
            <IconButton
              aria-label="Save edit"
              size="sm"
              colorPalette="green"
              variant="solid"
              borderRadius="lg"
              onClick={handleSaveEdit}
              minW={9}
              minH={9}
            >
              <LuCheck size={16} />
            </IconButton>
          </HStack>
          {editError && (
            <Text fontSize="xs" color="red.500" width="100%">
              {editError}
            </Text>
          )}
        </VStack>
      ) : (
        <HStack
          gap={{ base: 3, sm: 4 }}
          align="center"
          role="listitem"
          minH={{ base: 10, sm: 11 }}
        >
          <MotionBox
            flexShrink={0}
            initial={false}
            animate={todo.completed ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Checkbox.Root
              checked={todo.completed}
              onCheckedChange={() => onToggle(todo.id)}
              size="lg"
              colorPalette="accent"
              aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control borderRadius="md" />
            </Checkbox.Root>
          </MotionBox>

          <VStack
            flex={1}
            align="stretch"
            gap={0}
            minW={0}
            justify="center"
            onDoubleClick={handleStartEdit}
            cursor="text"
          >
            <Text
              fontSize={{ base: "sm", sm: "md" }}
              lineHeight="1.5"
              lineClamp={5}
              textDecoration={todo.completed ? "line-through" : "none"}
              color={todo.completed ? "fg.muted" : "fg"}
              opacity={todo.completed ? 0.7 : 1}
              transition="color 0.2s, opacity 0.2s"
            >
              {todo.text}
            </Text>
          </VStack>

          <HStack gap={2} flexShrink={0} align="center">
            <HStack
              gap={1}
              color="fg.subtle"
              fontSize="xs"
              whiteSpace="nowrap"
              flexShrink={0}
              display={{ base: "none", md: "flex" }}
            >
              <LuClock size={12} />
              <Text>{formatRelativeTime(todo.createdAt)}</Text>
            </HStack>
            <Tooltip content={`${config.label} priority (click to change)`}>
              <IconButton
                variant="subtle"
                size="sm"
                colorPalette={config.color}
                borderRadius="lg"
                minW={8}
                minH={8}
                cursor="pointer"
                transition="opacity 0.2s, transform 0.2s"
                _hover={{ opacity: 0.9, transform: "scale(1.05)" }}
                onClick={() =>
                  onUpdate(todo.id, { priority: getNextPriority(todo.priority) })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onUpdate(todo.id, {
                      priority: getNextPriority(todo.priority),
                    });
                  }
                }}
                aria-label={`Priority: ${config.label}. Click to change`}
              >
                {config.icon}
              </IconButton>
            </Tooltip>

            <IconButton
              aria-label="Edit task"
              variant="ghost"
              size="sm"
              colorPalette="gray"
              borderRadius="lg"
              onClick={handleStartEdit}
              minW={8}
              minH={8}
              opacity={0.7}
              _hover={{ opacity: 1, bg: "bg.muted" }}
            >
              <LuPencil size={15} />
            </IconButton>
            <IconButton
              aria-label="Delete task"
              variant="ghost"
              size="sm"
              colorPalette="red"
              borderRadius="lg"
              onClick={handleDeleteClick}
              minW={8}
              minH={8}
              opacity={0.7}
              _hover={{ opacity: 1, bg: "red.50", color: "red.600" }}
              _dark={{ _hover: { bg: "red.950", color: "red.400" } }}
            >
              <LuTrash2 size={15} />
            </IconButton>
          </HStack>
        </HStack>
      )}
    </Box>
  );
};
