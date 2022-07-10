import { useQuery } from '@apollo/client'
import { USERS_QUERY, UsersData } from '../graphql/queries/users.query'
import { NextPage } from 'next'

const UsersList: NextPage = () => {
  const { loading, error, data } = useQuery<UsersData>(USERS_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>

  const { users } = data
  if (!users) return null

  return (
    <ul>
      {users.map((user, index) => {
        return <li key={index}>{user.name}</li>
      })}
    </ul>
  )
}

export default UsersList
