import { useEffect, useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import { useApolloClient } from "@apollo/client"
import FavoriteGenre from "./components/FavoriteGenre"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const storedToken = localStorage.getItem("library-user-token")
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token !== null ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("favoriteGenre")}>recommend</button>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm
        show={page === "login"}
        setPage={setPage}
        setToken={setToken}
      />

      <FavoriteGenre show={page === "favoriteGenre"} />
    </div>
  )
}

export default App
