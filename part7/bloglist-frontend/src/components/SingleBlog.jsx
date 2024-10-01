import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { likeBlog } from "../reducers/blogsReducer"

const SingleBlog = () => {
  const { id } = useParams()
  const loggedUser = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const handleUpdate = () => {
    dispatch(likeBlog(blog))
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <p>{loggedUser.username} loggedIn</p>
      </div>
      <div>
        <h2>{blog.title}</h2>
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
