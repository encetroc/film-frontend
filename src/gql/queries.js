import { gql } from '@apollo/client'

export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
    }
  }
`
export const GET_SHAREHOLDERS = gql`
  query GetShareholders {
    shareholders {
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

export const GET_TRANSFERS = gql`
  query GetTransfers {
    transfers {
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

export const GET_SHAREHOLDER_TRANSFERS = gql`
  query GetShareholderTransfers($id: String!) {
    shareholderTransfers(id: $id) {
      id
      amount
      movie {
        title
      }
      shareholder {
        firstName
        lastName
        IBAN
        address
      }
    }
  }
`
