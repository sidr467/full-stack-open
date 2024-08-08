const express = require("express")
const app = express()
const cors = require("cors")
const Person = require("./models/person")

app.use(express.json())
app.use(cors())
app.use(express.static("dist"))

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.json(people)
    })
    .catch((error) => {
      next(error)
    })
})

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then((result) => {
      if (result) {
        res.json(result)
      } else {
        res.status(400).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.get("/info", (req, res, next) => {
  Person.countDocuments({}).then((result) => {
    res.send(`<p>Total ${result} people in database </br></br> ${Date()}</p>`)
  })
})

app.post("/api/persons", (req, res, next) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name and number are required" })
  }

  Person.findOne({ name: body.name }).then((existingPerson) => {
    if (existingPerson) {
      const updatedPerson = {
        name: body.name,
        number: body.number,
      }

      Person.findByIdAndUpdate(existingPerson._id, updatedPerson, { new: true })
        .then((updatedResult) => {
          res.json(updatedResult)
        })
        .catch((error) => {
          next(error)
        })
    } else {
      const person = new Person({
        name: body.name,
        number: body.number,
      })

      person
        .save()
        .then((savedPerson) => {
          res.json(savedPerson)
        })
        .catch((error) => {
          next(error)
        })
    }
  })
})

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then((deletedPerson) => {
      res.status(204).end()
    })
    .catch((error) => {
      next(error)
    })
})

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id
  const { name, number } = req.body

  const updatedPerson = {
    name,
    number,
  }

  Person.findByIdAndUpdate(id, updatedPerson, { new: true })
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      next(error)
    })
})

const errorHandler = (error, req, res, next) => {
  console.log(error)
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
