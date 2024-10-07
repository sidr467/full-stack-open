import { gql, useQuery } from "@apollo/client"
import Persons from "./components/Persons"

const ALL_PERSON = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`

function App() {
  const result = useQuery(ALL_PERSON)

  if (result.loading) {
    return <div>Loading.....</div>
  }

  return (
    <div>
      <Persons persons={result.data.allPersons} />
    </div>
  )
}

export default App
