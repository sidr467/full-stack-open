import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { createStore, combineReducers } from "redux"
import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'
import noteReducer from "./reducers/noteReducer"
import App from "./App"
import filterReducer from "./reducers/filterReducer"

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

const store = createStore(reducer)
// store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange("IMPORTANT"))
// store.dispatch(
//   createNote("combineReducers forms one reducer from many simple reducers")
// )

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <div />
//   </Provider>
// )
