import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

export const getAll = () => axios.get(baseUrl).then((res) => res.data)

export const createAnecdote = async (newAnecdote) => {
  if (newAnecdote.content.length < 5) {
    throw new Error("Anecdote content must be at least 5 characters long.")
  }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

export const voteAnecdote = (anecdote) =>
  axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then((res) => res.data)
