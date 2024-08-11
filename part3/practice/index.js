const app = require("./app") // the actual Express application
const config = require("./utils/config")
const logger = require("./utils/logger")

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

// const express = require("express")
// const app = express()
// const config = require("./utils/config")
// const logger = require("./utils/logger")
// const cors = require("cors")
// // const Note = require("./models/note")
// const notesRouter = require("express").Router()
// const Note = require("./models/note")

// app.use(express.json())
// app.use(cors())
// app.use(express.static("dist"))

// notesRouter.get("/", (request, response) => {
//   Note.find({}).then((notes) => {
//     response.json(notes)
//   })
// })

// notesRouter.get("/:id", (request, response, next) => {
//   Note.findById(request.params.id)
//     .then((note) => {
//       if (note) {
//         response.json(note)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch((error) => next(error))
// })

// notesRouter.post("/", (request, response, next) => {
//   const body = request.body

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//   })

//   note
//     .save()
//     .then((savedNote) => {
//       response.json(savedNote)
//     })
//     .catch((error) => next(error))
// })

// notesRouter.delete("/:id", (request, response, next) => {
//   Note.findByIdAndDelete(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch((error) => next(error))
// })

// notesRouter.put("/:id", (request, response, next) => {
//   const body = request.body

//   const note = {
//     content: body.content,
//     important: body.important,
//   }

//   Note.findByIdAndUpdate(request.params.id, note, { new: true })
//     .then((updatedNote) => {
//       response.json(updatedNote)
//     })
//     .catch((error) => next(error))
// })

// module.exports = notesRouter

// // app.get("/api/notes", (request, response) => {
// //   Note.find({}).then((notes) => {
// //     response.json(notes)
// //   })
// // })

// // app.get("/api/notes/:id", (request, response, next) => {
// //   Note.findById(request.params.id)
// //     .then((note) => {
// //       if (note) {
// //         response.json(note)
// //       } else {
// //         response.status(404).end()
// //       }
// //     })
// //     .catch((error) => {
// //       next(error)
// //     })
// // })

// // app.delete("/api/notes/:id", (request, response, next) => {
// //   Note.findByIdAndDelete(request.params.id)
// //     .then((result) => {
// //       response.status(204).end()
// //     })
// //     .catch((error) => {
// //       next(error)
// //     })
// // })

// // app.post("/api/notes", (request, response, next) => {
// //   const body = request.body

// //   const note = new Note({
// //     content: body.content,
// //     important: body.important || false,
// //   })

// //   note
// //     .save()
// //     .then((savedNote) => {
// //       response.json(savedNote)
// //     })
// //     .catch((error) => {
// //       next(error)
// //     })
// // })

// // app.put("/api/notes/:id", (request, response, next) => {

// //   const { content, important } = request.body

// //   // const note = {
// //   //   content: body.content,
// //   //   important: body.important,
// //   // }

// //   Note.findByIdAndUpdate(
// //     request.params.id,
// //     { content, important },
// //     { new: true, runValidators: true, context: "query" }
// //   )
// //     .then((updatedNote) => {
// //       response.json(updatedNote)
// //     })
// //     .catch((error) => next(error))
// // })

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   if (error.name === "CastError") {
//     return response.status(400).send({ error: "malformatted id" })
//   } else if (error.name === "ValidationError") {
//     return response.status(400).json({ error: error.message })
//   }
//   next(error)
// }

// app.use(errorHandler)

// app.listen(config.PORT, () => {
//   logger.info(`Server running on port ${config.PORT}`)
// })
// // const PORT = process.env.PORT
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`)
// // })
