import PropTypes from "prop-types"

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        For more information <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.object,
}

export default Anecdote
