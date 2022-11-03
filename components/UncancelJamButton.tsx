import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useState } from 'react'
import {
  UNCANCEL_JAM,
  UncancelJamData,
} from '../graphql/mutations/uncancel-jam.mutation'
import { Jam } from 'types'

interface UncancelJamButtonProps {
  jam: Jam
}

const UncancelJamButton: NextPage<UncancelJamButtonProps> = ({ jam }) => {
  const [message, setMessage] = useState<string>('')
  const [uncancelJam, uncancelResult] =
    useMutation<UncancelJamData>(UNCANCEL_JAM)
  const uncancelError = uncancelResult.error
  const handleUncancel = async () => {
    await uncancelJam({ variables: { id: parseInt(jam.id) } })
    uncancelError
      ? alert(`Error: ${JSON.stringify(uncancelError)}`)
      : setMessage('Successfully uncanceled')
  }
  if (!jam.canceledAt) return null

  return (
    <>
      <button onClick={handleUncancel}>中止取消</button>
      {message ? <span className="message">{message}</span> : null}
    </>
  )
}

export default UncancelJamButton
