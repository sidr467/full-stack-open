import { useState } from "react"

const Blog = ({ blog }) => {
  const [blogDataVisible, setDataBlogVisible] = useState(false)

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
            <div>{blog.url}</div>
            <div>{blog.likes} <button>Like</button></div>
            <div>{blog.user.name}</div>
          </div>
        )}
      </div>
    </>
  )
}

export default Blog
