import loginService from "../services/login"
import noteService from "../services/notes"
import {useState} from "react"

const LoginForm = ({setUser,setErrorMsg}) => {
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
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
