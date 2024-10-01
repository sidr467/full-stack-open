import { useState, useEffect } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import UserBlogs from "./components/UserBlogs"
import LoginForm from "./components/LoginForm"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "./reducers/notificationReducer"
import { initialBlogs } from "./reducers/blogsReducer"
import { loginUser, logoutUser, setUser } from "./reducers/userReducer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserList from "./components/UserList"
import { initialUsers } from "./reducers/usersReducer"
import SingleUser from "./components/SingleUser"
import SingleBlog from "./components/SingleBlog"
import { Link } from "react-router-dom"

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
      dispatch(initialUsers())
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
      dispatch(initialUsers())
    } catch (exception) {
      dispatch(showNotification("Wrong credentials", 5000))
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <Router>
      <div>
        <Link to="/">Blogs</Link>
        <span> </span>
        <Link to="/users">Users</Link>
      </div>
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
          <Routes>
            <Route path="/users" element={<UserList />}></Route>
            <Route path="/users/:id" element={<SingleUser />}></Route>
            <Route path="/blogs/:id" element={<SingleBlog />}></Route>
            <Route
              path="/"
              element={
                <UserBlogs
                  handleLogout={handleLogout}
                  blogs={blogs}
                  user={user}
                />
              }
            ></Route>
          </Routes>
        )}
      </div>
    </Router>
  )
}

export default App
