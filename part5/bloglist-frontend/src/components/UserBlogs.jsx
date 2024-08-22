import Blog from "./Blog"

const UserBlogs = ({ user, handleLogout, blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>
          {user.username} loggedIn
          <button onClick={handleLogout}>Logout</button>
        </p>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default UserBlogs
