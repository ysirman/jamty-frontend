import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { JAMS_QUERY, JamsData } from '../graphql/queries/jams.query'
import { NextPage } from 'next'

interface JamsListProps {}

const JamsList: NextPage<JamsListProps> = () => {
  const { loading, error, data } = useQuery<JamsData>(JAMS_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>

  const { jams } = data
  if (!jams) return null

  return (
    <ul>
      {jams.map((jam, index) => {
        return <li key={index}>{jam.place}</li>
      })}
    </ul>
  )
}

export default JamsList
