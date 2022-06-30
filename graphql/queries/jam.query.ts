import { gql } from '@apollo/client'
import { Jam } from '../../types'

export const JAM_QUERY = gql`
  query ($id: ID!) {
    jam(id: $id) {
      id
      scheduledFor
      prefectureId
      place
      description
      canceledAt
      createdAt
      updatedAt
    }
  }
`

export interface JamData {
  jam: Jam
}
