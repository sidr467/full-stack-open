import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = (props) => {
  const [selectGenre, setSelectGenre] = useState(null)

  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  })
  // console.log(result.data)

  if (result.loading) {
    return <div>Loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  const genres = [...new Set(books.flatMap((book) => book.genres))]
  const filteredBooks = selectGenre
    ? books.filter((book) => book.genres.includes(selectGenre))
    : books
  console.log(genres)

  return (
    <div>
      <h2>books</h2>

      <div>
        <button onClick={() => setSelectGenre(null)} style={{ marginRight: 5 }}>
          All genres
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            style={{ marginRight: 5 }}
            onClick={() => setSelectGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      <br />
      <br />

      <table border={1}>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
