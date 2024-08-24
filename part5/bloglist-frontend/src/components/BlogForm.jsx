import { useState } from "react"
import blogService from "../services/blogs"
import PropTypes from "prop-types"

const BlogForm = ({ setBlogs, blogs, setSuccessMsg }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

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
    <form action="" onSubmit={handleCreateBlog}>
      <h2>create new blog</h2>
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
  )
}

BlogForm.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setSuccessMsg: PropTypes.func.isRequired,
}

export default BlogForm
