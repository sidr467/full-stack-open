const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(express.json())

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method)
//   console.log("Path:  ", request.path)
//   console.log("Body:  ", request.body)
//   console.log("---")
//   next()
// }
// app.use(requestLogger)

morgan.token("body", (req) => JSON.stringify(req.body))

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)

app.get("/", (req, res) => {
  res.send("<h1>Hello persons</h1>")
})

//persons

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

//Info

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${
      persons.length
    } people.</br></br> ${Date()} </p>`
  )
})

//Single person date ID

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id
  const person = persons.find((p) => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

//Delete

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id
  persons = persons.filter((p) => p.id !== id)

  res.status(204).end()
})

//Adding with POST

const generateId = () => {
  const randomId = Math.floor(Math.random() * 1000000000)
  return randomId.toString()
}

app.post("/api/persons", (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: "Name missing",
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: "Number missing",
    })
  }

  let nameExists = persons.some((p) => p.name === body.name)
  if (nameExists) {
    return res.status(400).json({
      error: "Name must be unique",
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  res.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndpoint)
//PORT
const PORT = 3002
app.listen(PORT, () => {
  console.log(`server is running on ${PORT} port`)
})
