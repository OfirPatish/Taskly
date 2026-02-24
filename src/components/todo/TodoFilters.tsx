import { Box, Button, Input, VStack } from "@chakra-ui/react";
import { LuList, LuCircle, LuCircleCheck, LuSearch, LuX } from "react-icons/lu";
import type { TodoFilter, TodoSortOption } from "@/types/todo";

interface TodoFiltersProps {
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  counts: { all: number; active: number; completed: number };
  sort: TodoSortOption;
  onSortChange: (sort: TodoSortOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const FILTER_OPTIONS: { value: TodoFilter; label: string; icon: React.ReactNode }[] = [
  { value: "all", label: "All", icon: <LuList size={14} /> },
  { value: "active", label: "Active", icon: <LuCircle size={14} /> },
  { value: "completed", label: "Done", icon: <LuCircleCheck size={14} /> },
];

const SORT_ORDER: TodoSortOption[] = ["newest", "oldest", "priority", "alphabetical"];
const SORT_LABELS: Record<TodoSortOption, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  priority: "Priority",
  alphabetical: "A - Z",
};

const getNextSort = (current: TodoSortOption): TodoSortOption =>
  SORT_ORDER[(SORT_ORDER.indexOf(current) + 1) % SORT_ORDER.length];

export const TodoFilters = ({
  filter,
  onFilterChange,
  counts,
  sort,
  onSortChange,
  searchQuery,
  onSearchChange,
}: TodoFiltersProps) => {
  return (
    <Box
      p={{ base: 3, sm: 4 }}
      borderRadius="2xl"
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border"
      boxShadow="0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.06)"
      _dark={{ boxShadow: "0 1px 2px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.15)" }}
    >
      <VStack gap={3} align="stretch" width="100%">
      {/* Search bar */}
      <Box position="relative">
        <Box
          position="absolute"
          left={3}
          top="50%"
          transform="translateY(-50%)"
          color="fg.muted"
          pointerEvents="none"
          zIndex={1}
        >
          <LuSearch size={16} />
        </Box>
        <Input
          pl={{ base: 8, sm: 9 }}
          pr={searchQuery ? 9 : 3}
          size={{ base: "sm", sm: "md" }}
          variant="outline"
          borderRadius="xl"
          bg="bg.subtle"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search tasks"
        />
        {searchQuery && (
          <Box
            as="button"
            position="absolute"
            right={3}
            top="50%"
            transform="translateY(-50%)"
            color="fg.muted"
            cursor="pointer"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            tabIndex={0}
            _hover={{ color: "fg" }}
            zIndex={1}
          >
            <LuX size={16} />
          </Box>
        )}
      </Box>

      {/* Filter tabs + Sort - stacked on xs, row on sm+ */}
      <VStack gap={2} align="stretch" width="100%">
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr"
          gap={{ base: 0.5, sm: 1 }}
          p={{ base: 0.5, sm: 1 }}
          borderRadius="xl"
          bg="bg.muted"
        >
          {FILTER_OPTIONS.map(({ value, label, icon }) => (
            <Button
              key={value}
              variant={filter === value ? "solid" : "ghost"}
              colorPalette={filter === value ? "accent" : "gray"}
              size={{ base: "xs", sm: "sm" }}
              borderRadius="lg"
              minW={0}
              minH={{ base: 8, sm: 9 }}
              px={{ base: 1.5, sm: 2.5 }}
              py={{ base: 1.5, sm: 2 }}
              fontSize={{ base: "xs", sm: "sm" }}
              onClick={() => onFilterChange(value)}
              aria-pressed={filter === value}
              aria-label={`Show ${label.toLowerCase()} tasks (${counts[value]})`}
              transition="all 0.15s"
              _hover={filter !== value ? { bg: "bg.subtle" } : undefined}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <Box as="span" display="inline-flex" alignItems="center" flexShrink={0}>
                {icon}
              </Box>
              <Box
                as="span"
                display={{ base: "none", sm: "inline" }}
                truncate
                textAlign="center"
              >
                {label}
              </Box>
              <Box
                as="span"
                fontSize="xs"
                opacity={0.85}
                fontWeight="normal"
                flexShrink={0}
                minW="2.75rem"
                textAlign="right"
              >
                ({counts[value]})
              </Box>
            </Button>
          ))}
        </Box>

        <Button
          variant="outline"
          size={{ base: "xs", sm: "sm" }}
          width="100%"
          borderRadius="lg"
          bg="bg.subtle"
          justifyContent="center"
          fontSize="xs"
          onClick={() => onSortChange(getNextSort(sort))}
          aria-label={`Sort: ${SORT_LABELS[sort]}. Click to change`}
        >
          {SORT_LABELS[sort]}
        </Button>
      </VStack>
      </VStack>
    </Box>
  );
};
