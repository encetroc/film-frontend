import { gql } from '@apollo/client'

export const CREATE_MOVIE = gql`
  mutation CreateMovie($data: CreateMovieInput!) {
    createMovie(data: $data) {
      id
      title
    }
  }
`

export const CREATE_SHAREHOLDER = gql`
  mutation CreateShareholder($data: CreateShareholderInput!) {
    createShareholder(data: $data) {
      id
      firstName
      lastName
      address
      IBAN
      movie {
        id
        title
      }
    }
  }
`

export const CREATE_TRANSFER = gql`
  mutation CreateTransfer($data: CreateTransferInput!) {
    createTransfer(data: $data) {
      id
      amount
      description
      movie {
        id
        title
      }
    }
  }
`