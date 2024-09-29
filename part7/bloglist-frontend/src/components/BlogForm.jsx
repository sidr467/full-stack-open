import { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { showNotification } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogsReducer"

const BlogForm = ({ user }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const dispatch = useDispatch()

  const handleCreateBlog = (e) => {
    e.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: { id: user.id, name: user.name },
    }
    dispatch(createBlog(newBlog))
    dispatch(showNotification(`New blog ${title} by ${author} added`, 5000))
    setAuthor("")
    setTitle("")
    setUrl("")
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
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
}

export default BlogForm
