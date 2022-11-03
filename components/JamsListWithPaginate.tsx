import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import {
  JAMS_CONNECTION_QUERY,
  JamsConnectionData,
} from '../graphql/queries/jamsConnection.query'
import { NextPage } from 'next'
import { Jam, PageInfo } from 'types'

const JamsListWithPaginate: NextPage = () => {
  const first = 20
  const [after, setAfter] = useState('')
  const [jams, setJams] = useState<{ node: Jam }[] | never[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    endCursor: null,
    startCursor: null,
    hasPreviousPage: false,
    hasNextPage: false,
  })
  const { loading, error, data, fetchMore } = useQuery<JamsConnectionData>(
    JAMS_CONNECTION_QUERY,
    {
      variables: {
        first: first,
        after: after,
      },
    }
  )
  useEffect(() => {
    if (data && data.jamsConnection.pageInfo != pageInfo) {
      setJams([...jams, ...data.jamsConnection.edges])
      setPageInfo(data.jamsConnection.pageInfo)
    }
  }, [data])

  const handlePageChange = () => {
    fetchMore({
      variables: {
        first: first,
        after: after,
      },
    })
    if (!pageInfo?.endCursor) return
    setAfter(pageInfo.endCursor)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>
  if (!jams) return null

  return (
    <>
      <ul>
        {jams.map((jam, index) => {
          return (
            <li key={index}>
              {jam.node.place}{' '}
              <Link href={`/jams/${jam.node.id}`}>
                <a>[Detail]</a>
              </Link>
            </li>
          )
        })}
      </ul>
      {pageInfo?.hasNextPage && (
        <button onClick={handlePageChange}>さらに表示する</button>
      )}
    </>
  )
}

export default JamsListWithPaginate
