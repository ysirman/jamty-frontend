import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Jam } from 'types'
import {
  ENTRY_JAM,
  EntryJamData,
} from '../graphql/mutations/entry-jam.mutation'

interface EntryButtonProps {
  jam: Jam
}

const EntryButton: NextPage<EntryButtonProps> = ({ jam }) => {
  const [message, setMessage] = useState<string>('')
  const [entryJam, entryResult] = useMutation<EntryJamData>(ENTRY_JAM)
  const entryError = entryResult.error

  const { data: session, status } = useSession()
  const loading = status === 'loading'
  if (loading || !session) return null
  if (session.userId == jam.userId) return null

  const handleEntry = async () => {
    await entryJam({ variables: { jamId: parseInt(jam.id) } })
    entryError
      ? alert(`Error: ${JSON.stringify(entryError)}`)
      : setMessage('Successfully Entry Jam')
  }

  return (
    <>
      <button onClick={handleEntry}>申込</button>
      {message ? <span className="message">{message}</span> : null}
    </>
  )
}

export default EntryButton
