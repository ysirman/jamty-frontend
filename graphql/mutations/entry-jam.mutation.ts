import { gql } from '@apollo/client'
import { Entry } from '../../types'

export const ENTRY_JAM = gql`
  mutation ($jamId: ID!) {
    entryJam(input: { jamId: $jamId }) {
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

export interface EntryJamData {
  entryJam: {
    entry: Entry
  }
}
