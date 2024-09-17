import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotification } from "./NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
    },
    onError: (error) => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: error.message,
      })
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""

    console.log("new anecdote", content)

    newAnecdoteMutation.mutate({ content, votes: 0 })

    dispatch({
      type: "SET_NOTIFICATION",
      payload: `You created anecdote ${content}`,
    })

    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
