import PropTypes from "prop-types"
import Notification from "./Notification"

const LoginForm = ({
  handleLogin,
  username,
  password,
  setPassword,
  setUsername,
}) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 2,
    borderColor: "red",
    color: "red",
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 20,
  }

  return (
    <form action="" onSubmit={handleLogin}>
      <h1>Login to application</h1>
      <Notification style={style} />
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
}

export default LoginForm
