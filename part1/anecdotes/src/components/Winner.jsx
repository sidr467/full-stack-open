const Winner = ({ anecdotes, vote }) => {
  const maxVotes = Math.max(...vote)
  const maxVoteIndex = vote.indexOf(maxVotes)
  const winner = anecdotes[maxVoteIndex]
  return (
    <div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>
          {winner} <br /> has {maxVotes} votes
        </p>
      </div>
    </div>
  )
}

export default Winner
