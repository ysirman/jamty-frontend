import { gql } from '@apollo/client'
import { User } from '../../types'

export const USER_QUERY = gql`
  query ($id: ID!) {
    user(id: $id) {
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

export interface UserData {
  user: User
}
