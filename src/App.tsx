import { ErrorBoundary } from "@/components/error";
import { TodoPage } from "@/components/layout";

const App = () => (
  <ErrorBoundary>
    <TodoPage />
  </ErrorBoundary>
);

export default App;
