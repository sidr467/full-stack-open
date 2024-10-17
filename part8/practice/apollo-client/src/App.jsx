import { useQuery } from "@apollo/client"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Notify from "./components/Notify"
import { ALL_PERSONS } from "./queries"
import { useState } from "react"
import PhoneForm from "./components/PhoneForm"
import LoginForm from "./components/LoginForm"
import { useApolloClient } from "@apollo/client"
import { useEffect } from "react"

function App() {
  const [errorMsg, setErrorMsg] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const storedToken = localStorage.getItem("phonenumbers-user-token")
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000,
    skip: !token,
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

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMsg} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </>
    )
  }

  return (
    <div>
      <Notify errorMsg={errorMsg} />
      <button onClick={logout}>logout</button>
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
      <Persons persons={result.data.allPersons} />
    </div>
  )
}

export default App
