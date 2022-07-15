import { gql } from '@apollo/client'
import { User } from '../../types'

export const UPDATE_USER = gql`
  mutation ($params: UserInput!) {
    updateUser(input: { params: $params }) {
      user {
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
  }
`

export interface UpdateUserData {
  updateUser: {
    user: User
  }
}
