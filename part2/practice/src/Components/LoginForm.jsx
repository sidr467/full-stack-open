import loginService from "../services/login"
import noteService from "../services/notes"
import { useState } from "react"
import PropTypes from "prop-types"

const LoginForm = ({ setUser, setErrorMsg }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMsg("Wrong credentials")
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <form action="" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            data-testid="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            data-testid="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
}

export default LoginForm
