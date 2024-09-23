import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"
import PropTypes from "prop-types"

const CreateNew = ({ addNew }) => {
  const content = useField("text")
  const author = useField("text")
  const info = useField("text")
  const navigate = useNavigate()
  // console.log(content.va);

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate("/")
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            value={content.value}
            onChange={content.onChange}
            type={content.type}
            name="content"
          />
        </div>
        <div>
          author
          <input
            value={author.value}
            onChange={author.onChange}
            type={author.type}
            name="author"
          />
        </div>
        <div>
          url for more info
          <input
            value={info.value}
            onChange={info.onChange}
            type={info.type}
            name="info"
          />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  )
}

export default CreateNew

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
}
