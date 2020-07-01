import { gql } from "@apollo/client"

export const LIST_AUTHORS = gql`
    query listAuthors {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const LIST_BOOKS = gql`
    query listBooks {
        allBooks {
            title
            published
            genres
            author {
                name
            }
        }
    }
`

export const LIST_BOOKS_GENRE = gql`
    query listBooksGenre($genre: String!) {
        allBooks(
            genre: $genre
        ) {
            title
            published
            genres
            author {
                name
            }
        }
    }
`

export const ME = gql`
    query me {
        me {
            username
            favoriteGenre
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title
            published
            genres
        }
    }
`

export const UPDATE_AUTHOR_BIRTH_YEAR = gql`
    mutation updateAuthorBirthYear($name: String!, $born: Int!) {
        editAuthor(
            name: $name, 
            setBornTo: $born
        ) {
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(
            username: $username,
            password: $password
        ) {
            value
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title
            published
            genres
        }
    }
`