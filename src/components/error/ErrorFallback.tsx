import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";

interface ErrorFallbackProps {
  error: Error;
  resetError?: () => void;
}

export const ErrorFallback = ({ error, resetError }: ErrorFallbackProps) => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={6}
      bg="bg.subtle"
    >
      <VStack
        maxW="md"
        p={8}
        gap={4}
        bg="bg.panel"
        borderRadius="2xl"
        borderWidth="1px"
        borderColor="border"
        shadow="md"
        textAlign="center"
        role="alert"
        aria-live="assertive"
      >
        <Text fontSize="4xl" aria-hidden>
          😵
        </Text>
        <Heading size="lg" color="red.500">
          Something went wrong
        </Heading>
        <Text color="fg.muted" fontSize="sm">
          {error.message}
        </Text>
        {resetError && (
          <Button
            colorPalette="accent"
            onClick={resetError}
            aria-label="Try again"
          >
            Try again
          </Button>
        )}
      </VStack>
    </Box>
  );
};
