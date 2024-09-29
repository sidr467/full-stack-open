import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlogs(state, action) {
      return [...state, action.payload]
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
  },
})

export const { setBlogs, appendBlogs, deleteBlog, updateBlog } =
  blogSlice.actions

export const initialBlogs = () => {
  return (dispatch) => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      dispatch(setBlogs(sortedBlogs))
    })
  }
}

export const createBlog = (newBlog) => {
  return (dispatch) => {
    blogService.create(newBlog).then((returnedBlog) => {
      dispatch(appendBlogs(returnedBlog))
    })
  }
}

export const removeBlog = (id) => {
  return (dispatch) => {
    blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export const likeBlog = (blog) => {
  return (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService.updateLikes(blog.id, updatedBlog).then((returnedBlog) => {
      dispatch(updateBlog(returnedBlog))
    })
  }
}

export default blogSlice.reducer
