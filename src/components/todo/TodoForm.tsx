import {
  Box,
  FieldErrorText,
  FieldRoot,
  HStack,
  IconButton,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Keybind } from "@/components/ui/keybind";
import { Tooltip } from "@/components/ui/tooltip";
import { useState, useCallback, useRef } from "react";
import { LuPlus, LuArrowDown, LuMinus, LuArrowUp } from "react-icons/lu";
import { TODO_MAX_LENGTH } from "@/utils/validation";
import type { TodoPriority } from "@/types/todo";

interface TodoFormProps {
  onSubmit: (text: string, priority?: TodoPriority) => { success: boolean; error?: string };
  onSuccess?: () => void;
  onError?: (message: string) => void;
  inputRef?: React.RefObject<HTMLTextAreaElement | null>;
}

const PRIORITY_ORDER: TodoPriority[] = ["low", "medium", "high"];
const PRIORITY_OPTIONS: Record<
  TodoPriority,
  { label: string; icon: React.ReactNode; color: string }
> = {
  low: {
    label: "Low",
    icon: <LuArrowDown size={18} />,
    color: "green",
  },
  medium: {
    label: "Medium",
    icon: <LuMinus size={18} />,
    color: "orange",
  },
  high: {
    label: "High",
    icon: <LuArrowUp size={18} />,
    color: "red",
  },
};

const getNextPriority = (current: TodoPriority): TodoPriority => {
  const i = PRIORITY_ORDER.indexOf(current);
  return PRIORITY_ORDER[(i + 1) % PRIORITY_ORDER.length];
};

export const TodoForm = ({ onSubmit, onSuccess, onError, inputRef: inputRefProp }: TodoFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState<TodoPriority>("medium");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const internalRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = inputRefProp ?? internalRef;

  const handleSubmit = useCallback(() => {
    const result = onSubmit(inputValue, priority);
    setTouched(true);

    if (result.success) {
      setInputValue("");
      setError(null);
      setPriority("medium");
      onSuccess?.();
    } else {
      setError(result.error ?? "Something went wrong");
      onError?.(result.error ?? "Something went wrong");
      inputRef.current?.focus();
    }
  }, [inputValue, priority, onSubmit, onSuccess, onError, inputRef]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setError(null);
  }, []);

  const handleBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const charCount = inputValue.length;
  const isOverLimit = charCount > TODO_MAX_LENGTH;
  const showCharCounter = charCount > TODO_MAX_LENGTH * 0.75;

  return (
    <Box
      p={{ base: 4, sm: 5 }}
      borderRadius="2xl"
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border"
      boxShadow="0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.06)"
      transition="box-shadow 0.2s, border-color 0.2s"
      _hover={{
        boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.08)",
      }}
      _dark={{
        boxShadow: "0 1px 2px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.15)",
        _hover: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.2)",
        },
      }}
    >
      <FieldRoot invalid={!!error}>
        <VStack gap={3} align="stretch" width="100%">
          <HStack
            gap={2}
            align="stretch"
            width="100%"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Box position="relative" flex={1} minW={0}>
              <Textarea
                ref={inputRef}
                placeholder="What needs to be done?"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                size="lg"
                variant="outline"
                borderRadius="xl"
                borderColor={error ? "red.500" : "border.emphasized"}
                bg="bg.subtle"
                _placeholder={{ color: "fg.muted" }}
                _focusVisible={{
                  outline: "2px solid",
                  outlineColor: error ? "red.500" : "accent.500",
                  bg: "bg",
                }}
                maxLength={TODO_MAX_LENGTH}
                rows={Math.min(Math.max(1, Math.ceil(inputValue.length / 40)), 5)}
                resize="vertical"
                minH="2.75rem"
                maxH="10rem"
                pr={showCharCounter ? 16 : 3}
                aria-label="New task input"
                aria-invalid={!!error}
                aria-describedby={error ? "todo-form-error" : undefined}
              />
              {showCharCounter && (
                <Text
                  position="absolute"
                  right={3}
                  bottom={2}
                  fontSize="xs"
                  color={isOverLimit ? "red.500" : "fg.muted"}
                  fontWeight={isOverLimit ? "bold" : "normal"}
                  pointerEvents="none"
                  fontFamily="mono"
                >
                  {charCount}/{TODO_MAX_LENGTH}
                </Text>
              )}
            </Box>

            <HStack
              gap={2}
              align="center"
              flexShrink={0}
              justifyContent={{ base: "center", md: "flex-end" }}
            >
              <Tooltip
                content={`${PRIORITY_OPTIONS[priority].label} priority (click to change)`}
              >
                <IconButton
                  variant="outline"
                  size="lg"
                  colorPalette={PRIORITY_OPTIONS[priority].color}
                  borderRadius="xl"
                  bg="bg.subtle"
                  onClick={() => setPriority(getNextPriority(priority))}
                  aria-label={`Priority: ${PRIORITY_OPTIONS[priority].label}. Click to change`}
                >
                  {PRIORITY_OPTIONS[priority].icon}
                </IconButton>
              </Tooltip>

              <IconButton
                aria-label="Add task"
                onClick={handleSubmit}
                size="lg"
                colorPalette="accent"
                borderRadius="xl"
                transition="all 0.2s"
                _hover={{
                  transform: "scale(1.02)",
                  boxShadow: "0 2px 8px rgba(20,184,166,0.35)",
                }}
                _active={{ transform: "scale(0.98)" }}
                disabled={!inputValue.trim()}
              >
                <LuPlus />
              </IconButton>
            </HStack>
          </HStack>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            pt={1}
          >
            <Text fontSize="xs" color="fg.subtle" whiteSpace="nowrap">
              <Keybind keys="Enter" /> to add
            </Text>
            <Text fontSize="xs" color="fg.subtle">
              ·
            </Text>
            <Text fontSize="xs" color="fg.subtle" whiteSpace="nowrap">
              <Keybind keys="Shift+Enter" /> new line
            </Text>
          </Box>
        </VStack>

        {error && touched && (
          <FieldErrorText id="todo-form-error" mt={2} color="red.500" fontSize="sm">
            {error}
          </FieldErrorText>
        )}
      </FieldRoot>
    </Box>
  );
};
