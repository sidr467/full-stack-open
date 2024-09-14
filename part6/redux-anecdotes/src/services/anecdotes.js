import axios from "axios"
const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
  }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const updateVote = async (id, updateAnecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, updateAnecdote)
  return response.data
}

export default { getAll, createNew, updateVote }
