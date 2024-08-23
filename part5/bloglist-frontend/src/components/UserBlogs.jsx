import { useState } from "react"
import Blog from "./Blog"
import blogService from "../services/blogs"

const UserBlogs = ({ user, handleLogout, blogs, setBlogs }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const handleCreateBlog = (e) => {
    e.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    blogService.create(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMsg(`A new blog ${newBlog.title} by ${newBlog.author} added `)
      setTimeout(() => {
        setSuccessMsg("")
      }, 3000)
      setAuthor("")
      setTitle("")
      setUrl("")
    })
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>
          {user.username} loggedIn
          <button onClick={handleLogout}>Logout</button>
        </p>
        <div>{successMsg && <p className="successMsg">{successMsg}</p>}</div>
        <form action="" onSubmit={handleCreateBlog}>
          <h2>create new</h2>
          <div>
            <label htmlFor="title">Title : </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="author">Author : </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="url">Url : </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
        <br />
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default UserBlogs
