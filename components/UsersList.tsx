import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { USERS_QUERY, UsersData } from '../graphql/queries/users.query'
import { NextPage } from 'next'

const UsersList: NextPage = () => {
  const { loading, error, data } = useQuery<UsersData>(USERS_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>
  if (!data) return null
  const { users } = data

  return (
    <ul>
      {users.map((user, index) => {
        return (
          <li key={index}>
            {user.name}{' '}
            <Link href={`/users/${user.id}`}>
              <a>[Detail]</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default UsersList
