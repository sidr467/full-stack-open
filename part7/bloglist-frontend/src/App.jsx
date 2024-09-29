import { useState, useEffect } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import UserBlogs from "./components/UserBlogs"
import LoginForm from "./components/LoginForm"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "./reducers/notificationReducer"
import { initialBlogs } from "./reducers/blogsReducer"
import { loginUser, logoutUser, setUser } from "./reducers/userReducer"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
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
      blogService.setToken(user.token)
      dispatch(loginUser(user))
      setPassword("")
      setUsername("")
      dispatch(initialBlogs())
    } catch (exception) {
      dispatch(showNotification("Wrong credentials", 5000))
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
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
