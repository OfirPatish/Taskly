import { Box, HStack, Text } from "@chakra-ui/react";

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  highlight?: boolean;
  colorScheme?: string;
}

export const StatItem = ({
  icon,
  label,
  value,
  highlight,
  colorScheme,
}: StatItemProps) => (
  <HStack gap={1.5} align="center" flexShrink={0}>
    <Box
      color={highlight ? (colorScheme === "green" ? "green.500" : "accent.500") : "fg.subtle"}
      display="flex"
      alignItems="center"
    >
      {icon}
    </Box>
    <Text fontSize="sm" color="fg.muted" whiteSpace="nowrap">
      {label}
    </Text>
    <Text
      fontSize="sm"
      fontWeight="bold"
      minW="1.5rem"
      textAlign="right"
      color={highlight ? (colorScheme === "green" ? "green.500" : "fg") : "fg.muted"}
    >
      {value}
    </Text>
  </HStack>
);
