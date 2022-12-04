import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { JAMS_QUERY, JamsData } from '../graphql/queries/jams.query'
import { NextPage } from 'next'

const JamsList: NextPage = () => {
  const { loading, error, data } = useQuery<JamsData>(JAMS_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>
  if (!data) return null
  const { jams } = data

  return (
    <ul>
      {jams.map((jam, index) => {
        return (
          <li key={index}>
            {jam.place}{' '}
            <Link href={`/jams/${jam.id}`}>
              <a>[Detail]</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default JamsList
