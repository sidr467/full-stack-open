import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

const FavoriteGenre = ({ show }) => {
  const result = useQuery(ALL_BOOKS)
  const userResult = useQuery(ME)

  if (result.loading || userResult.loading) {
    return <div>Loading...</div>
  }

  const books = result.data.allBooks
  const favoriteGenre = userResult.data.me.favoriteGenre

  const recommendedBook = books.filter((book) =>
    book.genres
      .map((genre) => genre.toLowerCase().trim())
      .includes(favoriteGenre.toLowerCase().trim())
  )

  console.log(recommendedBook)

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        Books in your favorite genre <b>{favoriteGenre}</b>
      </div>
      <br />
      <table
        border={1}
        style={{
          borderStyle: "solid",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          <tr style={{ padding: 5 }}>
            <th style={{ padding: 5 }}></th>
            <th style={{ padding: 5 }}>author</th>
            <th style={{ padding: 5 }}>published</th>
          </tr>
          {recommendedBook.map((a) => (
            <tr key={a.title}>
              <td style={{ padding: 5 }}>{a.title}</td>
              <td style={{ padding: 5 }}>{a.author.name}</td>
              <td style={{ padding: 5 }}>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FavoriteGenre
