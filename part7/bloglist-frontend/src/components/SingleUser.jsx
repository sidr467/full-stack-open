import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const SingleUser = () => {
  const { id } = useParams()
  const loggedUser = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const user = users.find((u) => u.id === id)
  if (!user) {
    return null
  }

  console.log(user)

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <p>{loggedUser.username} loggedIn</p>
      </div>
      <h2>{user.name}</h2>
      <div>
        <h3>Added blogs</h3>
        <ul>
          {user.blogs.map((b) => (
            <li key={b.id}>{b.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SingleUser
