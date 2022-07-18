import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { Session } from 'next-auth'
import { useState } from 'react'
import { Jam } from 'types'
import {
  ENTRY_JAM,
  EntryJamData,
} from '../graphql/mutations/entry-jam.mutation'

interface EntryButtonProps {
  jam: Jam
  session: Session // WithSessionから受け取る
}

const EntryButton: NextPage<EntryButtonProps> = ({ jam, session }) => {
  const [message, setMessage] = useState<string>('')
  const [entryJam, entryResult] = useMutation<EntryJamData>(ENTRY_JAM)
  const entryError = entryResult.error
  const handleEntry = async () => {
    await entryJam({ variables: { jamId: parseInt(jam.id) } })
    entryError
      ? alert(`Error: ${JSON.stringify(entryError)}`)
      : setMessage('Successfully Entry Jam')
  }

  if (jam.candidates?.some((c) => parseInt(c.id) === session.userId))
    return null

  return (
    <>
      <button onClick={handleEntry}>申込</button>
      {message ? <span className="message">{message}</span> : null}
    </>
  )
}

export default EntryButton
