import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addComment, likeBlog, removeBlog } from "../reducers/blogsReducer"
import { useState } from "react"

const SingleBlog = () => {
  const { id } = useParams()
  const loggedUser = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)
  const dispatch = useDispatch()
  const [comment, setComment] = useState("")

  if (!blog) {
    return <p>No blog found</p>
  }
  const handleUpdate = async () => {
    try {
      dispatch(likeBlog(blog))
    } catch (error) {
      console.error("Error updating likes:", error)
    }
  }

  const handleDeleteBlog = async () => {
    const id = blog.id
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(removeBlog(id))
      } catch (error) {
        console.error("Failed to delete blog:", error)
      }
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    dispatch(addComment(id, comment))
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <p>{loggedUser.username} loggedIn</p>
      </div>
      <div>
        <h2>{blog.title}</h2>
        <button onClick={handleDeleteBlog}>Delete</button>
        <div>
          <div>
            <a href="https://en.wikipedia.org/wiki/Ikigai">{blog.url}</a>
          </div>
          <div>
            {blog.likes} <button onClick={handleUpdate}>Like</button>
          </div>
          <div>added by {blog.author}</div>
        </div>
        <div>
          <h3>Comments</h3>
          <form action="">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" onClick={handleAddComment}>
              Add comment
            </button>
          </form>
          {blog.comments.map((c) => (
            <ul key={c}>
              <li>{c}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SingleBlog
