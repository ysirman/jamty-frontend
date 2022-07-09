import { useQuery, useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { JAM_QUERY, JamData } from '../graphql/queries/jam.query'
import { useState } from 'react'
import {
  CANCEL_JAM,
  CancelJamData,
} from '../graphql/mutations/cancel-jam.mutation'

interface JamItemProps {
  id: string
}

const JamItem: NextPage<JamItemProps> = ({ id }) => {
  const [message, setMessage] = useState<string>('')
  const { loading, error, data } = useQuery<JamData>(JAM_QUERY, {
    variables: { id: parseInt(id) },
  })
  const [cancelJam, mutationResult] = useMutation<CancelJamData>(CANCEL_JAM)
  const mutationError = mutationResult.error

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>

  const { jam } = data
  if (!jam) return null

  const handleCancel = async () => {
    await cancelJam({
      variables: {
        id: parseInt(jam.id),
      },
    })

    mutationError
      ? alert(`Error: ${JSON.stringify(mutationError)}`)
      : setMessage('Successfully canceled')
  }

  return (
    <>
      <div>
        <button onClick={handleCancel}>Cancel</button>
        {message ? <span className="message">{message}</span> : null}
      </div>
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
    </>
  )
}

export default JamItem
