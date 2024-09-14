import ReactDOM from "react-dom/client"
import store from "./reducers/store"
import { Provider } from "react-redux"
import App from "./App"
import anecdotesService from "../services/anecdotes"
import { setAnecdotes } from "./reducers/anecdoteReducer"

anecdotesService
  .getAll()
  .then((anecdotes) => store.dispatch(setAnecdotes(anecdotes)))

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)
