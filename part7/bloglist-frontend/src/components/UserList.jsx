import { useSelector } from "react-redux"

const UserList = () => {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  console.log(users)

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <p>{user.username} loggedIn</p>
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
                  <td>{u.name}</td>
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
