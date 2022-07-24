import { gql } from '@apollo/client'
import { JamsConnection } from '../../types'

export const JAMS_CONNECTION_QUERY = gql`
  query ($first: Int!, $after: String!) {
    jamsConnection(first: $first, after: $after) {
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
      edges {
        node {
          id
          userId
          scheduledFor
          prefectureId
          place
          description
          canceledAt
          createdAt
          updatedAt
          candidates {
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
    }
  }
`

export interface JamsConnectionData {
  jamsConnection: JamsConnection
}
