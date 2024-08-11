const app = require("./app")
const config = require("./utils/config")
const logger = require("./utils/logger")

app.listen(config.PORT, () => {
  logger.info(`Server is running on ${config.PORT}`)
})


// const mongoUrl = process.env.MONGO_URL
// console.log("Connect to", mongoUrl)

// mongoose.connect(mongoUrl)

// app.use(cors())
// app.use(express.json())

// app.get("/api/blogs", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs)
//   })
// })

// app.post("/api/blogs", (request, response) => {
//   const blog = new Blog(request.body)

//   blog.save().then((result) => {
//     response.status(201).json(result)
//   })
// })

// const PORT = 3003
// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`)
// })
