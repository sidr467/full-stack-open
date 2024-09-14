import { useEffect } from "react"
import { initialAnecdotes, updatevote } from "../reducers/anecdoteReducer"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialAnecdotes())
  }, [dispatch])

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredanecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )

    return [...filteredanecdotes].sort((a, b) => b.votes - a.votes)
  })

  const vote = (id) => {
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id)
    dispatch(updatevote(id))
    dispatch(
      showNotification(`Voted for an anecdote "${votedAnecdote.content}"`, 5)
    )
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
