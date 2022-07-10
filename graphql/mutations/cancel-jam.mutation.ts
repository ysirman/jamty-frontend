import { gql } from '@apollo/client'
import { Jam } from '../../types'

export const CANCEL_JAM = gql`
  mutation ($id: ID!) {
    cancelJam(input: { id: $id }) {
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

export interface CancelJamData {
  cancelJam: {
    jam: Jam
  }
}
