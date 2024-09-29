import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const loginUser = (user) => {
  return (dispatch) => {
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser")
    dispatch(clearUser())
  }
}

export default userSlice.reducer
