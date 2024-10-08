import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_PERSONS, CREATE_PERSON } from "../queries"

const PersonForm = ({ setError }) => {
  const [name, setName] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [phone, setPhone] = useState("")

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      const message = error.graphQLErrors.map((e) => e.message).join("\n")
      setError(message)
    },
  })

  const submit = (e) => {
    e.preventDefault()

    createPerson({ variables: { name, street, city, phone } })

    setName("")
    setStreet("")
    setCity("")
    setPhone("")
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={submit} action="">
        <div>
          Name{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          Street{" "}
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div>
          City{" "}
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          Phone{" "}
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default PersonForm
