import ReactDOM from "react-dom/client"
import App from "./App"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { NotificationProvider } from "./components/NotificationContext"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotificationProvider>
)
