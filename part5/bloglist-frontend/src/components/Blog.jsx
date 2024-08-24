import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, blogs, setBlogs }) => {
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
    alert(`Remove blog ${blog.title} by ${blog.author}`)
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (error) {
      console.error("failed to delete blog:", error)
    }
  }

  return (
    <>
      <div className="blogstyle">
        {!blogDataVisible ? (
          <div>
            {blog.title} {blog.author}{" "}
            <button onClick={() => setDataBlogVisible(true)}>View</button>
          </div>
        ) : (
          <div>
            <div>
              {blog.title} {blog.author}{" "}
              <button onClick={() => setDataBlogVisible(false)}>hide</button>
            </div>
            <a href="">{blog.url}</a>
            <div>
              {blog.likes} <button onClick={handleUpdate}>Like</button>
            </div>
            <div>{blog.user.name}</div>
            <button className="deleteBtn" onClick={handleDeleteBlog}>
              remove
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Blog
