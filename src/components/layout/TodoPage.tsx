import {
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertRoot,
  AlertTitle,
  Box,
  VStack,
} from "@chakra-ui/react";
import { useFocusTodoInput } from "@/hooks/useFocusTodoInput";
import { useTodoPage } from "@/hooks/useTodoPage";
import { TodoForm, TodoFilters, TodoList } from "@/components/todo";
import { Footer } from "./Footer";
import { Header } from "@/components/header";

export const TodoPage = () => {
  const todoInputRef = useFocusTodoInput();
  const {
    todos,
    filteredTodos,
    filter,
    setFilter,
    sort,
    setSort,
    searchQuery,
    setSearchQuery,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    activeCount,
    completedCount,
    storageError,
    handleAddSuccess,
    handleAddError,
    handleClearCompleted,
  } = useTodoPage();

  return (
    <Box
      minH="100vh"
      bg="bg.subtle"
      py={{ base: 4, sm: 6, md: 10 }}
      px={{ base: 2, sm: 4 }}
    >
      <VStack
        maxW="2xl"
        mx="auto"
        gap={{ base: 5, md: 6 }}
        align="stretch"
        w="100%"
        minW={0}
      >
        <Header
          totalCount={todos.length}
          activeCount={activeCount}
          completedCount={completedCount}
        />

        {storageError && (
          <AlertRoot
            status="error"
            variant="subtle"
            borderRadius="xl"
            alignItems="flex-start"
          >
            <AlertIndicator />
            <AlertContent flex={1}>
              <AlertTitle>Storage error</AlertTitle>
              <AlertDescription>{storageError}</AlertDescription>
            </AlertContent>
          </AlertRoot>
        )}

        <TodoForm
          inputRef={todoInputRef}
          onSubmit={(text, priority) => addTodo(text, priority)}
          onSuccess={handleAddSuccess}
          onError={handleAddError}
        />

        <TodoFilters
          filter={filter}
          onFilterChange={setFilter}
          counts={{
            all: todos.length,
            active: activeCount,
            completed: completedCount,
          }}
          sort={sort}
          onSortChange={setSort}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <TodoList
          todos={filteredTodos}
          filter={filter}
          searchQuery={searchQuery}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />

        <Footer
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={handleClearCompleted}
        />
      </VStack>
    </Box>
  );
};
