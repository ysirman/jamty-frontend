import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { JAM_QUERY, JamData } from '../graphql/queries/jam.query'

interface JamItemProps {
  id: string
}

const JamItem: NextPage<JamItemProps> = ({ id }) => {
  const { loading, error, data } = useQuery<JamData>(JAM_QUERY, {
    variables: { id: parseInt(id) },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>

  const { jam } = data
  if (!jam) return null

  return (
    <ul>
      <li>{jam.id}</li>
      <li>{jam.scheduledFor}</li>
      <li>{jam.prefectureId}</li>
      <li>{jam.place}</li>
      <li>{jam.description}</li>
      <li>{jam.canceledAt}</li>
      <li>{jam.createdAt}</li>
      <li>{jam.updatedAt}</li>
    </ul>
  )
}

export default JamItem
