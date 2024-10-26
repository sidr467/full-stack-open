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

  type Subscription {
    bookAdded: Book!
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
module.exports = typeDefs
