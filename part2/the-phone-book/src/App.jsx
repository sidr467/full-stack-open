import { useState } from "react"
import Filter from "./components/Filter"
import AddName from "./components/AddName"
import Number from "./components/Number"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  const handleAdding = (e) => {
    e.preventDefault()

    let nameExist = persons.some((person) => person.name === newName)
    let numberExist = persons.some((person) => person.number === newNumber)

    if (nameExist) {
      alert(`${newName} is already added to the phonebook`)
      setNewName("")
      return
    }
    if (numberExist) {
      alert(`${newNumber} is already added`)
      setNewNumber("")
    }

    const addName = {
      name: newName,
      id: String(persons.length + 1),
      number: newNumber,
    }

    setPersons(persons.concat(addName))
    setNewName("")
    setNewNumber("")
  }

  const filterName = (filter) => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
  }
  let result = filterName(filter)

  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }
  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }
  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} value={filter} />
      <AddName
        handleAdding={handleAdding}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <Number result={result} />
    </div>
  )
}

export default App
