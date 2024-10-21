import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation (
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`
export const EDIT_BORNYEAR = gql`
  mutation ($name: String!, $setToBorn: Int!) {
    editAuthor(name: $name, setToBorn: $setToBorn) {
      name
      born
    }
  }
`
export const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
