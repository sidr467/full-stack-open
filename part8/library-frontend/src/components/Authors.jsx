import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_BORNYEAR } from "../queries"
import { useState } from "react"
import Select from "react-select"

const Authors = (props) => {
  const [author, setAuthor] = useState(null)
  const [born, setBorn] = useState("")

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  })
  const [editAuthor] = useMutation(EDIT_BORNYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (result.loading) {
    return <div>Loading...</div>
  }

  if (!props.show) {
    return null
  }

  const editBornYear = (e) => {
    e.preventDefault()

    editAuthor({
      variables: {
        name: author.value,
        setToBorn: parseInt(born),
      },
    })

    setAuthor(null)
    setBorn("")
  }

  const authors = result.data.allAuthors
  const auhtorlist = authors.map((a) => ({
    value: a.name,
    label: a.name,
  }))
  // console.log(auhtorlist)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <form action="" onSubmit={editBornYear}>
        <div>
          Auhtor Name{" "}
          <Select
            options={auhtorlist}
            value={author}
            onChange={setAuthor}
            isClearable
            required
          ></Select>
        </div>
        <div>
          Born Year{" "}
          <input
            type="text"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />
        </div>
        <button type="submit">Change</button>
      </form>
    </div>
  )
}

export default Authors
