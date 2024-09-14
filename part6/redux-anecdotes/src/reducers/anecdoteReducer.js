import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find((a) => a.id === id)
      anecdoteToVote.votes += 1
    },
  },
})

export const { appendAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updatevote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const anecdoteToVote = anecdotes.find((a) => a.id === id)

    const updatedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    }

    const savedAnecdote = await anecdotesService.updateVote(id, updatedAnecdote)
    dispatch(setAnecdotes(anecdotes.map(a => a.id !== id ? a : savedAnecdote)))
  }
}

export default anecdoteSlice.reducer
