import axios from "axios"
const url = "http://localhost:3001/persons"

const getAllPersons = () => {
  const request = axios.get(url)
  return request.then((response) => response.data)
}

const createPerson = (addName) => {
  const request = axios.post(url, addName)
  return request.then((response) => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then((response) => response.data)
}

const updatePerson = (id, updatePerson) => {
  const request = axios.put(`${url}/${id}`, updatePerson)
  return request.then((response) => response.data)
}

export default { getAllPersons, createPerson, deletePerson, updatePerson }
