import { useQuery, useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { JAM_QUERY, JamData } from '../graphql/queries/jam.query'
import { useState } from 'react'
import {
  CANCEL_JAM,
  CancelJamData,
} from '../graphql/mutations/cancel-jam.mutation'
import {
  UNCANCEL_JAM,
  UncancelJamData,
} from '../graphql/mutations/uncancel-jam.mutation'
import WithSession from '@/WithSession'
import EntryButton from '@/EntryButton'
import Link from 'next/link'

interface JamItemProps {
  id: string
}

const JamItem: NextPage<JamItemProps> = ({ id }) => {
  const [message, setMessage] = useState<string>('')
  const { loading, error, data } = useQuery<JamData>(JAM_QUERY, {
    variables: { id: parseInt(id) },
  })
  const [cancelJam, cancelResult] = useMutation<CancelJamData>(CANCEL_JAM)
  const [uncancelJam, uncancelResult] =
    useMutation<UncancelJamData>(UNCANCEL_JAM)
  const cancelError = cancelResult.error
  const uncancelError = uncancelResult.error

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>

  const { jam } = data
  if (!jam) return null

  const mutationVariables = { id: parseInt(jam.id) }
  const handleCancel = async () => {
    await cancelJam({ variables: mutationVariables })
    cancelError
      ? alert(`Error: ${JSON.stringify(cancelError)}`)
      : setMessage('Successfully canceled')
  }

  const handleUncancel = async () => {
    await uncancelJam({ variables: mutationVariables })
    uncancelError
      ? alert(`Error: ${JSON.stringify(uncancelError)}`)
      : setMessage('Successfully uncanceled')
  }

  const cancelButtonHundler = jam.canceledAt ? handleUncancel : handleCancel
  const cancelButtonLabel = jam.canceledAt ? 'uncancel' : 'cancel'

  return (
    <>
      <WithSession userId={jam.userId}>
        <Link href={`/jams/${id}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={cancelButtonHundler}>{cancelButtonLabel}</button>
        {message ? <span className="message">{message}</span> : null}
      </WithSession>
      <WithSession>
        <EntryButton jam={jam} />
      </WithSession>
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
