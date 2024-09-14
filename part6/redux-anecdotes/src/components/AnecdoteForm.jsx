import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer"
import anecdotesService from "../../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ""
    const newAnectdote = await anecdotesService.createNew(content)
    dispatch(createAnecdote(newAnectdote))
    dispatch(setNotification(`Created new anecdote: ${content}`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
