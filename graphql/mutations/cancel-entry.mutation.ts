import { gql } from '@apollo/client'
import { Jam } from '../../types'

export const CANCEL_ENTRY = gql`
  mutation ($jamId: ID!) {
    cancelEntry(input: { jamId: $jamId }) {
      jam {
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
`

export interface CancelEntryData {
  cancelEntry: {
    jam: Jam
  }
}
