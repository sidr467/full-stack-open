const Anecdote = ({ selected, anecdotes, vote }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]} <br /> has {vote[selected]} votes
      </p>
    </div>
  )
}

export default Anecdote
