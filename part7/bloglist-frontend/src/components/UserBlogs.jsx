import Blog from "./Blog"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import PropTypes from "prop-types"
import Notification from "./Notification"

const UserBlogs = ({ user, handleLogout, blogs }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 2,
    borderColor: "green",
    color: "green",
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 20,
  }
  return (
    <div>
      <h2>Blogs</h2>
      <div>
        <p>
          {user.username} loggedIn
          <button onClick={handleLogout}>Logout</button>
        </p>
        <Notification style={style} />
        <Togglable buttonLabel="create new blog">
          <BlogForm blogs={blogs} user={user} />
        </Togglable>
        <br />
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} blogs={blogs} user={user} />
      ))}
    </div>
  )
}

UserBlogs.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  handleLogout: PropTypes.func.isRequired,
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
