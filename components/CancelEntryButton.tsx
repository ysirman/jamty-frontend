import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { Session } from 'next-auth'
import { useState } from 'react'
import { Jam } from '../types'
import {
  CANCEL_ENTRY,
  CancelEntryData,
} from '../graphql/mutations/cancel-entry.mutation'

interface CancelEntryButtonProps {
  jam: Jam
  session: Session // WithSessionから受け取る
}

const CancelEntryButton: NextPage<CancelEntryButtonProps> = ({
  jam,
  session,
}) => {
  const [message, setMessage] = useState<string>('')
  const [cancelEntry, mutationResult] =
    useMutation<CancelEntryData>(CANCEL_ENTRY)
  const error = mutationResult.error

  if (session.userId == jam.userId) return null
  if (!jam.candidates?.some((c) => parseInt(c.id) === session.userId))
    return null

  const handleEntry = async () => {
    await cancelEntry({ variables: { jamId: parseInt(jam.id) } })

    error
      ? alert(`Error: ${JSON.stringify(error)}`)
      : setMessage('Successfully Cancel Entry')
  }

  return (
    <>
      <button onClick={handleEntry}>申込キャンセル</button>
      {message ? <span className="message">{message}</span> : null}
    </>
  )
}

export default CancelEntryButton
