import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./notificationReducer"
import blogReducer from "./blogsReducer"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
  },
})

export default store
