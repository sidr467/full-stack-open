const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { expressMiddleware } = require("@apollo/server/express4")
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const express = require("express")
const cors = require("cors")
const http = require("http")
const jwt = require("jsonwebtoken")
const { WebSocketServer } = require("ws")
const { useServer } = require("graphql-ws/lib/use/ws")
// const { GraphQLError } = require("graphql")
// const Book = require("./models/book")
// const Author = require("./models/author")
const Luser = require("./models/user")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")
// mongoose.set("strictQuery", false)

const mongoose = require("mongoose")

require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI

console.log("connecting to", MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log("Error connection to MongoDB:", error.message)
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        console.log("Authorization header:", auth) // Log the auth header
        if (auth && auth.startsWith("Bearer ")) {
          try {
            const decodedToken = jwt.verify(
              auth.substring(7),
              process.env.JWT_SECRET
            )
            console.log("Decoded Token:", decodedToken) // Log the decoded token
            const currentUser = await Luser.findById(decodedToken.id)
            console.log("Current User:", currentUser) // Log the current user
            return { currentUser }
          } catch (error) {
            console.error("Token verification error:", error) // Log any errors
          }
        }
      },
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()
