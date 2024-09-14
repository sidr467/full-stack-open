import { createSlice } from "@reduxjs/toolkit"

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// // const asObject = (anecdotes) => {
// //   return {
// //     content: anecdotes,
// //     id: getId(),
// //     votes: 0,
// //   }
// // }
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find((a) => a.id === id)
      anecdoteToVote.votes += 1
    },
  },
})

export const { createAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
