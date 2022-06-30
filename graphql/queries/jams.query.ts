import { gql } from '@apollo/client'
import { Jam } from '../../types'

export const JAMS_QUERY = gql`
  query {
    jams {
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

export interface JamsData {
  jams: Jam[]
}
