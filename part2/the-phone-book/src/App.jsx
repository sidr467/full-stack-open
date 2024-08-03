import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import AddName from "./components/AddName"
import Number from "./components/Number"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data)
    })
  },[])

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
