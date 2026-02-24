import { Box, Text, VStack } from "@chakra-ui/react";
import { motion } from "motion/react";
import { LuInbox, LuPartyPopper, LuCircleCheck, LuSearchX } from "react-icons/lu";
import type { TodoFilter } from "@/types/todo";

interface EmptyStateProps {
  filter: TodoFilter;
  searchQuery?: string;
}

const MotionBox = motion.create(Box);

const MESSAGES: Record<
  TodoFilter,
  { title: string; subtitle: string; icon: React.ReactNode }
> = {
  all: {
    title: "No tasks yet",
    subtitle: "Create your first task above to get started!",
    icon: <LuInbox size={32} />,
  },
  active: {
    title: "All caught up!",
    subtitle: "No active tasks right now. Time to relax or add something new.",
    icon: <LuPartyPopper size={32} />,
  },
  completed: {
    title: "No completed tasks",
    subtitle: "Complete a task to see it here.",
    icon: <LuCircleCheck size={32} />,
  },
};

export const EmptyState = ({ filter, searchQuery }: EmptyStateProps) => {
  const isSearching = !!searchQuery?.trim();

  if (isSearching) {
    return (
      <VStack
        py={{ base: 12, sm: 16 }}
        px={{ base: 4, sm: 6 }}
        gap={4}
        color="fg.muted"
        role="status"
        aria-label="No results found"
      >
        <Box
          p={4}
          borderRadius="2xl"
          bg="accent.subtle"
          color="accent.fg"
        >
          <LuSearchX size={32} />
        </Box>
        <Text fontSize="lg" fontWeight="semibold" color="fg">
          No matches found
        </Text>
        <Text fontSize="sm" textAlign="center" maxW="xs" color="fg.muted">
          No tasks match "{searchQuery}". Try a different search term.
        </Text>
      </VStack>
    );
  }

  const { title, subtitle, icon } = MESSAGES[filter];

  return (
    <VStack
      py={{ base: 12, sm: 16 }}
      px={{ base: 4, sm: 6 }}
      gap={4}
      color="fg.muted"
      role="status"
      aria-label={`${title}. ${subtitle}`}
    >
      <MotionBox
        p={4}
        borderRadius="2xl"
        bg="accent.subtle"
        color="accent.fg"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {icon}
      </MotionBox>
      <Text fontSize="lg" fontWeight="semibold" color="fg">
        {title}
      </Text>
      <Text fontSize="sm" textAlign="center" maxW="xs" color="fg.muted">
        {subtitle}
      </Text>
    </VStack>
  );
};
