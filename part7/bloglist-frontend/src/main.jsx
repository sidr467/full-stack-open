import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import store from "./reducers/store"
import { Provider } from "react-redux"
import { Link } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <Link to="/">Blogs</Link>
    <Link to="/users">Users</Link>
     */}
    <App />
  </Provider>
)
