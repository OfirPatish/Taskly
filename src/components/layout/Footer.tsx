import { Button, HStack, Text } from "@chakra-ui/react";
import { Keybind } from "@/components/ui/keybind";

interface FooterProps {
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export const Footer = ({
  activeCount,
  completedCount,
  onClearCompleted,
}: FooterProps) => (
  <HStack
    justify="space-between"
    align="center"
    px={{ base: 1, sm: 2 }}
    flexWrap="wrap"
    gap={2}
  >
    <Text fontSize="xs" color="fg.subtle">
      {activeCount} task{activeCount !== 1 ? "s" : ""} remaining
      <Text as="span" display={{ base: "none", md: "inline" }} ml={1.5}>
        · <Keybind keys="mod+K" /> to add
      </Text>
    </Text>
    {completedCount > 0 && (
      <Button
        variant="ghost"
        size="xs"
        colorPalette="gray"
        borderRadius="lg"
        onClick={onClearCompleted}
        _hover={{ color: "red.500" }}
      >
        Clear completed ({completedCount})
      </Button>
    )}
  </HStack>
);
