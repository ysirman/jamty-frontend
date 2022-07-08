import { gql } from '@apollo/client'
import { Jam } from '../../types'

export const CREATE_JAM = gql`
  mutation ($params: JamInput!) {
    createJam(input: { params: $params }) {
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

export interface CreateJamData {
  createJam: {
    jam: Jam
  }
}
