import { useState } from "react"
import blogService from "../services/blogs"
import PropTypes from "prop-types"

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [blogDataVisible, setDataBlogVisible] = useState(false)

  const handleUpdate = async () => {
    const id = blog.id
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    try {
      const returnedBlog = await blogService.updateLikes(id, updatedBlog)
      setBlogs(blogs.map((b) => (b.id !== id ? b : returnedBlog)))
    } catch (error) {
      console.error("Error updating likes:", error)
    }
  }

  const handleDeleteBlog = async () => {
    const id = blog.id
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter((b) => b.id !== id))
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
          <span className="title">{blog.title}</span> --{" "}
          <span className="author">{blog.author}</span>
          <button className="view" onClick={() => setDataBlogVisible(true)}>
            View
          </button>
        </div>
      ) : (
        <div className="blogDetails">
          <div>
            <span className="title">{blog.title}</span> --{" "}
            <span className="author">{blog.author}</span>
            <button onClick={() => setDataBlogVisible(false)}>hide</button>
          </div>
          <a href="">{blog.url}</a>
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
  setBlogs: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
}

export default Blog
