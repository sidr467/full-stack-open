import { useState, useEffect } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import UserBlogs from "./components/UserBlogs"
import LoginForm from "./components/LoginForm"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "./reducers/notificationReducer"
import { initialBlogs } from "./reducers/blogsReducer"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      dispatch(initialBlogs())
    }
  }, [dispatch])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setPassword("")
      setUsername("")
      dispatch(initialBlogs())
    } catch (exception) {
      dispatch(showNotification("Wrong credentials", 5000))
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      ) : (
        <UserBlogs handleLogout={handleLogout} blogs={blogs} user={user} />
      )}
    </div>
  )
}

export default App
