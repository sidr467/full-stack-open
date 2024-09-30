import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./notificationReducer"
import blogReducer from "./blogsReducer"
import userReducer from "./userReducer"
import usersReducer from "./usersReducer"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
