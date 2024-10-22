import { useQuery, useSubscription } from "@apollo/client"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Notify from "./components/Notify"
import { ALL_PERSONS, PERSON_ADDED } from "./queries"
import { useState } from "react"
import PhoneForm from "./components/PhoneForm"
import LoginForm from "./components/LoginForm"
import { useApolloClient } from "@apollo/client"
import { useEffect } from "react"

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedPerson) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    }
  })
}

function App() {
  const [errorMsg, setErrorMsg] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMsg(message)
    setTimeout(() => {
      setErrorMsg(null)
    }, 10000)
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("phonenumbers-user-token")
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  useSubscription(PERSON_ADDED, {
    onData: ({ data, client }) => {
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`)
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
    },
  })

  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000,
    skip: !token,
  })

  if (result.loading) {
    return <div>Loading.....</div>
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
