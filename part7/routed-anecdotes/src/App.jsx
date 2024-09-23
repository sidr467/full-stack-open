import { useState } from "react"
import { Route, Routes, useMatch } from "react-router-dom"
import Menu from "./components/Menu"
import CreateNew from "./components/CreateNew"
import Footer from "./components/Footer"
import About from "./components/About"
import AnecdoteList from "./components/AnecdoteList"
import Anecdote from "./components/Anecdote"

const App = () => {
  const [notification, setNotification] = useState("")
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote ${anecdote.content} created`)
    setTimeout(() => {
      setNotification("")
    }, 5000)
  }

  const match = useMatch("/anecdotes/:id")
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null
  console.log(anecdote)

  // const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1,
  //   }

  //   setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  // }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <div>{notification}</div>
      <Routes>
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        ></Route>
        <Route
          path="/"
          element={<AnecdoteList anecdotes={anecdotes} />}
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/create"
          element={<CreateNew addNew={addNew} notification={setNotification} />}
        ></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
