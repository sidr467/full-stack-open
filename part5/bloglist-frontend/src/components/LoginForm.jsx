const LoginForm = ({
  handleLogin,
  username,
  password,
  setPassword,
  setUsername,
  errorMsg,
}) => {
  return (
    <form action="" onSubmit={handleLogin}>
      <h1>Login to application</h1>
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
      {errorMsg && <p>{errorMsg}</p>}
    </form>
  )
}

export default LoginForm
