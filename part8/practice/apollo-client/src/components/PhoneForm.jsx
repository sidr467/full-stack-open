import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_NUMBER } from "../queries"

const PhoneForm = ({setError}) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const [changeNumber, result] = useMutation(EDIT_NUMBER)

  const submit = (e) => {
    e.preventDefault()

    changeNumber({ variables: { name, phone } })

    setName("")
    setPhone("")
  }

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError("Person cannot be found")
    }
  }, [result.data])

  return (
    <div>
      <h2>Change Number</h2>
      <form action="" onSubmit={submit}>
        <div>
          Name{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <button type="submit">Change</button>
      </form>
    </div>
  )
}

export default PhoneForm
