import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useMatch,
} from "react-router-dom"
import { useState } from "react"
import Home from "./components/Home"
import Users from "./components/Users"
import Notes from "./components/Notes"
import Note from "./components/Note"
import Login from "./components/Login"
import { Alert } from "react-bootstrap"
import styled from "styled-components"

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "HTML is easy",
      important: true,
      user: "Matti Luukkainen",
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
      user: "Matti Luukkainen",
    },
    {
      id: 3,
      content: "Most important methods of HTTP-protocol are GET and POST",
      important: true,
      user: "Arto Hellas",
    },
  ])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const match = useMatch("/notes/:id")
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const padding = {
    padding: 5,
  }

  return (
    <Page>
      {message && <Alert variant="success">{message}</Alert>}
      <Navigation>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </Navigation>
      <br />
      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />}></Route>
        <Route path="/notes" element={<Notes notes={notes} />}></Route>
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />}></Route>
      </Routes>
      <Footer>
        <em>Note app, Department of Computer Science 2022</em>
      </Footer>
    </Page>
  )
}

export default App
