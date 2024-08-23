import { useState, useEffect, useRef } from "react"
import Note from "./Components/Note"
import noteService from "./services/notes"
import Notification from "./Components/Notification"
import Footer from "./Components/Footer"
import LoginForm from "./Components/LoginForm"
import NoteForm from "./Components/NoteForm"
import Togglable from "./Components/Togglable"

const App = () => {
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [notes, setNotes] = useState([])
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id == id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)))
      })
      .catch(() => {
        setErrorMsg(`Note ${note.content} was already removed from server`)
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)

  window.localStorage.clear()

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm setUser={setUser} setErrorMsg={setErrorMsg} />
        </Togglable>
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      )}

      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  )
}

export default App

{
  /*Exchange rate api  */
}

// import { useState, useEffect } from 'react'
// import axios from 'axios'

// const App = () => {
//   const [value, setValue] = useState('')
//   const [rates, setRates] = useState({})
//   const [currency, setCurrency] = useState(null)

//   useEffect(() => {
//     console.log('effect run, currency is now', currency)

//     // skip if currency is not defined
//     if (currency) {
//       console.log('fetching exchange rates...')
//       axios
//         .get(`https://open.er-api.com/v6/latest/${currency}`)
//         .then(response => {
//           setRates(response.data.rates)
//         })
//     }
//   }, [currency])

//   const handleChange = (event) => {
//     setValue(event.target.value)
//   }

//   const onSearch = (event) => {
//     event.preventDefault()
//     setCurrency(value)
//   }

//   return (
//     <div>
//       <form onSubmit={onSearch}>
//         currency: <input value={value} onChange={handleChange} />
//         <button type="submit">exchange rate</button>
//       </form>
//       <pre>
//         {JSON.stringify(rates, null, 2)}
//       </pre>
//     </div>
//   )
// }

// export default App
