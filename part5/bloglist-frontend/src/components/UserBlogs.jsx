import { useState } from "react"
import Blog from "./Blog"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import PropTypes from "prop-types"

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
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
        />
      ))}
    </div>
  )
}

UserBlogs.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  handleLogout: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
}
// user: PropTypes.shape({
//   username: PropTypes.string.isRequired,
// }).isRequired,
// handleLogout: PropTypes.func.isRequired,
// blogs: PropTypes.arrayOf(
//   PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     author: PropTypes.string.isRequired,
//     url: PropTypes.string,
//     likes: PropTypes.number.isRequired,
//     user: PropTypes.shape({
//       name: PropTypes.string,
//     }),
//   })
// ).isRequired,
// setBlogs: PropTypes.func.isRequired,

export default UserBlogs
