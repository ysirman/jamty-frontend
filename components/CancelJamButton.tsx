import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useState } from 'react'
import {
  CANCEL_JAM,
  CancelJamData,
} from '../graphql/mutations/cancel-jam.mutation'
import { Jam } from 'types'

interface CancelJamButtonProps {
  jam: Jam
}

const CancelJamButton: NextPage<CancelJamButtonProps> = ({ jam }) => {
  const [message, setMessage] = useState<string>('')
  const [cancelJam, cancelResult] = useMutation<CancelJamData>(CANCEL_JAM)
  const cancelError = cancelResult.error
  const handleCancel = async () => {
    await cancelJam({ variables: { id: parseInt(jam.id) } })
    cancelError
      ? alert(`Error: ${JSON.stringify(cancelError)}`)
      : setMessage('Successfully canceled')
  }
  if (jam.canceledAt) return null

  return (
    <>
      <button onClick={handleCancel}>中止</button>
      {message ? <span className="message">{message}</span> : null}
    </>
  )
}

export default CancelJamButton
