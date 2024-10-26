const { GraphQLError, subscribe } = require("graphql")
const jwt = require("jsonwebtoken")
const Book = require("./models/book")
const Author = require("./models/author")
const Luser = require("./models/user")
const { PubSub } = require("graphql-subscriptions")
const { Subscription } = require("../practice/apollo/resolvers")
const pubsub = new PubSub()

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
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        })
      }

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

        const savedBook = await book.save()
        const populatedBook = await savedBook.populate("author")
        pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook })
        return populatedBook
      } catch (error) {
        throw new GraphQLError("Error adding book: " + error.message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
          },
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        })
      }
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
}

module.exports = resolvers
