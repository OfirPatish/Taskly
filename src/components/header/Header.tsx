import {
  Box,
  Center,
  Heading,
  HStack,
  ProgressCircleRange,
  ProgressCircleRoot,
  ProgressCircleTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuCircleCheck, LuListTodo, LuSparkles } from "react-icons/lu";
import { ColorModeButton } from "@/components/ui/color-mode";
import { StatItem } from "./StatItem";

interface HeaderProps {
  totalCount: number;
  activeCount: number;
  completedCount: number;
}

const calculateCompletionPercent = (
  total: number,
  completed: number
): number =>
  total > 0 ? Math.round((completed / total) * 100) : 0;

export const Header = ({
  totalCount,
  activeCount,
  completedCount,
}: HeaderProps) => {
  const completionPercent = calculateCompletionPercent(
    totalCount,
    completedCount
  );

  return (
    <Box
      p={{ base: 4, sm: 5 }}
      borderRadius="2xl"
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border"
      boxShadow="0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.06)"
      transition="box-shadow 0.2s, border-color 0.2s"
      _dark={{
        boxShadow: "0 1px 2px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <HStack justify="space-between" align="center">
        <HStack gap={{ base: 3, sm: 4 }} align="center" minW={0}>
          <Center
            w={{ base: 10, sm: 11 }}
            h={{ base: 10, sm: 11 }}
            borderRadius="xl"
            bg="accent.600"
            color="white"
            transition="transform 0.2s, background-color 0.2s"
            _hover={{ transform: "scale(1.02)", bg: "accent.700" }}
          >
            <LuCircleCheck size={22} />
          </Center>
          <VStack gap={0} align="flex-start">
            <Heading
              size={{ base: "lg", sm: "xl" }}
              fontWeight="700"
              letterSpacing="-0.025em"
              lineHeight="1.2"
              color="fg.emphasized"
            >
              Taskly
            </Heading>
            <Text
              fontSize="xs"
              color="fg.muted"
              display={{ base: "none", sm: "block" }}
            >
              Stay organized, get things done
            </Text>
          </VStack>
        </HStack>
        <ColorModeButton aria-label="Toggle color mode" />
      </HStack>

      {totalCount > 0 && (
        <HStack
          mt={4}
          pt={4}
          borderTopWidth="1px"
          borderColor="border"
          gap={{ base: 3, sm: 6 }}
          flexWrap="wrap"
        >
          <StatItem
            icon={<LuListTodo size={14} />}
            label="Total"
            value={totalCount}
          />
          <StatItem
            icon={<LuSparkles size={14} />}
            label="Active"
            value={activeCount}
            highlight={activeCount > 0}
          />
          <StatItem
            icon={<LuCircleCheck size={14} />}
            label="Done"
            value={completedCount}
            highlight={completedCount > 0}
            colorScheme="green"
          />
          <Box flex={1} />
          <HStack gap={2} align="center">
            <ProgressCircleRoot
              value={completionPercent}
              size="xs"
              colorPalette={completionPercent === 100 ? "green" : "accent"}
            >
              <ProgressCircleTrack />
              <ProgressCircleRange />
            </ProgressCircleRoot>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color={completionPercent === 100 ? "green.500" : "fg.muted"}
            >
              {completionPercent}%
            </Text>
          </HStack>
        </HStack>
      )}
    </Box>
  );
};
