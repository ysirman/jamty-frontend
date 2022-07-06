import { gql } from '@apollo/client'
import { Jam } from '../../types'

export const UPDATE_JAM = gql`
  mutation ($id: ID!, $params: JamInput!) {
    updateJam(input: { id: $id, params: $params }) {
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

export interface UpdateJamData {
  updateJam: {
    jam: Jam
  }
}

export interface JamInputType {
  params: {
    prefectureId?: number
    description?: string
    place?: string
    scheduledFor?: string
  }
}
