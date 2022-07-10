import { gql } from '@apollo/client'
import { Jam } from '../../types'

export const UNCANCEL_JAM = gql`
  mutation ($id: ID!) {
    uncancelJam(input: { id: $id }) {
      jam {
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
  }
`

export interface UncancelJamData {
  uncancelJam: {
    jam: Jam
  }
}
