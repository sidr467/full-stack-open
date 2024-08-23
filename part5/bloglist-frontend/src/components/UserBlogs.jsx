import { useState } from "react"
import Blog from "./Blog"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"

const UserBlogs = ({ user, handleLogout, blogs, setBlogs }) => {
  const [successMsg, setSuccessMsg] = useState("")

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>
          {user.username} loggedIn
          <button onClick={handleLogout}>Logout</button>
        </p>
        <div>{successMsg && <p className="successMsg">{successMsg}</p>}</div>
        <Togglable buttonLabel="create new blog">
          <BlogForm
            setBlogs={setBlogs}
            blogs={blogs}
            setSuccessMsg={setSuccessMsg}
          />
        </Togglable>
        <br />
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default UserBlogs
