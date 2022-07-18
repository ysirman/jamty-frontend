import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { JAM_QUERY, JamData } from '../graphql/queries/jam.query'
import WithSession from '@/WithSession'
import CancelJamButton from '@/CancelJamButton'
import UncancelJamButton from '@/UncancelJamButton'
import EntryButton from '@/EntryButton'
import CancelEntryButton from '@/CancelEntryButton'
import Link from 'next/link'
import CandidatesList from '@/CandidatesList'

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
    <>
      <WithSession userId={jam.userId} isOwner={true}>
        <Link href={`/jams/${id}/edit`}>
          <button>Edit</button>
        </Link>
        <CancelJamButton jam={jam} />
        <UncancelJamButton jam={jam} />
      </WithSession>
      <WithSession userId={jam.userId} isOwner={false}>
        <EntryButton jam={jam} />
        <CancelEntryButton jam={jam} />
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
      <h2>参加希望者</h2>
      <CandidatesList candidates={jam.candidates} />
    </>
  )
}

export default JamItem
