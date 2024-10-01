import { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { likeBlog, removeBlog } from "../reducers/blogsReducer"
import { Link } from "react-router-dom"

const Blog = ({ blog, user }) => {
  const [blogDataVisible, setDataBlogVisible] = useState(false)
  const dispatch = useDispatch()

  const handleUpdate = async () => {
    // const id = blog.id

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

  console.log("Current user:", user)
  console.log("Blog user:", blog.user)

  return (
    <div className="blogstyle">
      {!blogDataVisible ? (
        <div className="blogAuthorTitle">
          <span className="title">
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </span>{" "}
          -- <span className="author">{blog.author}</span>
          <button className="view" onClick={() => setDataBlogVisible(true)}>
            View
          </button>
        </div>
      ) : (
        <div className="blogDetails">
          <div>
            <span className="title">
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </span>{" "}
            -- <span className="author">{blog.author}</span>
            <button onClick={() => setDataBlogVisible(false)}>hide</button>
          </div>
          <a href="https://en.wikipedia.org/wiki/Ikigai">{blog.url}</a>
          <div>
            <span className="likes">{blog.likes}</span>{" "}
            <button className="likeBtn" onClick={handleUpdate}>
              Like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {user.name === blog.user.name && (
            <button className="deleteBtn" onClick={handleDeleteBlog}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
