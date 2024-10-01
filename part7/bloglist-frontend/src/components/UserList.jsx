import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const UserList = () => {
  const loggedUser = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  console.log(users)

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <p>{loggedUser.username} loggedIn</p>
      </div>
      <div>
        <h2>Users</h2>
        <div>
          <table>
            <tbody>
              <tr>
                <th>name</th>
                <th>blogs</th>
              </tr>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <Link to={`/users/${u.id}`}>{u.name}</Link>
                  </td>
                  <td>{u.blogs.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserList
