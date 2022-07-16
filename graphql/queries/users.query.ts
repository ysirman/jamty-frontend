import { gql } from '@apollo/client'
import { User } from '../../types'

export const USERS_QUERY = gql`
  query {
    users {
      id
      name
      nickname
      image
      description
      location
      createdAt
      updatedAt
    }
  }
`

export interface UsersData {
  users: User[]
}
