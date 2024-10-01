import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
  return (
    <tr>
      <td>
        <Link style={{ textDecoration: "none" }} to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </td>
      <td>{blog.author}</td>
    </tr>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
