import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
  return (
    <div className="blogstyle">
      <div className="blogAuthorTitle">
        <span className="title">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </span>{" "}
        -- <span className="author">{blog.author}</span>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
