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
import Nav from "react-bootstrap/Nav"
import "bootstrap/dist/css/bootstrap.min.css"
import Container from "react-bootstrap/Container"

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
      <Container>
        <Nav>
          <Nav.Item>
            <Nav.Link href="/">Blogs</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/users">Users</Nav.Link>
          </Nav.Item>
        </Nav>
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
      </Container>
    </Router>
  )
}

export default App
