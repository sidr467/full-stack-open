import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("library-user-token", token)
    }
  }, [result.data, setToken])

  const submit = async (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
    setPassword("")
    setUsername("")
    setPage("authors")
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form action="" onSubmit={submit}>
        <div>
          Username :
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          Password :
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
