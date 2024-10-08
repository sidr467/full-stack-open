import { useQuery } from "@apollo/client"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Notify from "./components/Notify"
import { ALL_PERSONS } from "./queries"
import { useState } from "react"
import PhoneForm from "./components/PhoneForm"

function App() {
  const [errorMsg, setErrorMsg] = useState(null)

  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000,
  })

  if (result.loading) {
    return <div>Loading.....</div>
  }

  const notify = (message) => {
    setErrorMsg(message)
    setTimeout(() => {
      setErrorMsg(null)
    }, 10000)
  }

  return (
    <div>
      <Notify errorMsg={errorMsg} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
      <Persons persons={result.data.allPersons} />
    </div>
  )
}

export default App
