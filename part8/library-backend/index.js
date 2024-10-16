const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const Book = require("./models/book")
const Author = require("./models/author")
const Luser = require("./models/user")

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

let authors = [
  {
    name: "Robert Martin",
    born: 1952,
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
]

const typeDefs = `
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    genres: [String!]!, 
    id: ID!,
  }

  type Author {
    name: String!,
    id: ID!,
    born : String,  
    bookCount: Int!
  }

  type Query {
    authorCount : Int!
    booksCount : Int!
    allBooks(author:String,genre:String) : [Book!]!
    allAuthors : [Author]!
    me:User
  }

  type Mutation {
    addBook(
        title: String!,
        published: Int!,
        author: String!,
        genres: [String!]!,
    ):Book

    editAuthor(
        name:String!,
        setToBorn:Int!
    ):Author

     createUser(
    username: String!
    favoriteGenre: String!
  ): User

  login(
    username: String!
    password: String!
  ): Token
  }
`

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    booksCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          query.author = author._id
        } else {
          return []
        }
      }

      if (args.genre) {
        query.genres = { $in: [args.genre] }
      }

      return await Book.find(query).populate("author")
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root._id })
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        let author = await Author.findOne({ name: args.author })

        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }

        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id,
        })

        await book.save()
        return book.populate("author")
      } catch (error) {
        throw new GraphQLError("Error adding book: " + error.message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
          },
        })
      }
    },
    editAuthor: async (root, args) => {
      try {
        const author = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setToBorn },
          { new: true }
        )
        if (!author) {
          throw new GraphQLError("Author not found")
        }
        return author
      } catch (error) {
        throw new GraphQLError("Error editing author: " + error.message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
          },
        })
      }
    },
    createUser: async (root, args) => {
      const user = new Luser({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      try {
        await user.save()
        return user
      } catch (error) {
        throw new GraphQLError("error creating user", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        })
      }
    },

    login: async (root, args) => {
      const user = await Luser.findOne({ username: args.username })

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
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
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
