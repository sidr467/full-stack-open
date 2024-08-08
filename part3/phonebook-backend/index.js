const express = require("express")
const app = express()
const cors = require("cors")
const Person = require("./models/person")

app.use(express.json())
app.use(cors())
app.use(express.static("dist"))

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people)
  })
})

app.post("/api/persons", (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name and number are required" })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((savedPerson) => {
    res.json(savedPerson)
  })
})

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id
  Person.findByIdAndDelete(id).then((deletedPerson) => {
    res.status(204).end()
  })
})

app.put("/api/persons/:id", (req, res) => {
  const id = req.params.id
  const { name, number } = req.body

  updatedPerson = {
    name,
    number,
  }

  Person.findByIdAndUpdate(id, updatedPerson).then((result) => {
    res.json(result)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
