import { useState, useEffect } from "react"
import Note from "./Components/Note"
import noteService from "./services/notes"
import Notification from "./Components/Notification"
import Footer from "./Components/Footer"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrorMsg] = useState("some error happened")

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
      setNewNote("")
    })
  }

  const togglrImportance = (id) => {
    const note = notes.find((n) => n.id == id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)))
      })
      .catch((error) => {
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

  const handleNoteChange = (e) => {
    console.log(e.target.value)
    setNewNote(e.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            togglrImportance={() => togglrImportance(note.id)}
          />
        ))}
      </ul>
      <form action="" onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
