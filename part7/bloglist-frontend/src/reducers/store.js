import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./notificationReducer"
import blogReducer from "./blogsReducer"
import userReducer from "./userReducer"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
})

export default store
