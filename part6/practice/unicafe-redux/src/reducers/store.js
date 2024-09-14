import { configureStore } from "@reduxjs/toolkit"
import filterReducer from "./filterReducer"
import noteReducer from "./noteReducer"

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
})

export default store
