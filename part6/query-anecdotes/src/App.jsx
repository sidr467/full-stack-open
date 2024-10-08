import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import { getAll, voteAnecdote } from "./requests"
import { useNotification } from "./components/NotificationContext"

const App = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
    },
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    })

    dispatch({
      type: "SET_NOTIFICATION",
      payload: `You voted for ${anecdote.content}`,
    })

    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" })
    }, 5000)
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: 1,
  })

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>Anecdote service is not available due to server problem</div>
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
