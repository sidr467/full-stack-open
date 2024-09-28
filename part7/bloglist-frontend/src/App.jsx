import { useState, useEffect } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import UserBlogs from "./components/UserBlogs"
import LoginForm from "./components/LoginForm"
import { useDispatch } from "react-redux"
import { showNotification } from "./reducers/notificationReducer"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then((blogs) => {
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
      })
    }
  }, [])

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
      const blogs = await blogService.getAll()
      setBlogs(blogs)
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
        <UserBlogs
          handleLogout={handleLogout}
          blogs={blogs}
          user={user}
          setBlogs={setBlogs}
        />
      )}
    </div>
  )
}

export default App
