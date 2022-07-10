import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { USER_QUERY, UserData } from '../graphql/queries/user.query'

interface UserItemProps {
  id: string
}

const UserItem: NextPage<UserItemProps> = ({ id }) => {
  const { loading, error, data } = useQuery<UserData>(USER_QUERY, {
    variables: { id: parseInt(id) },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>

  const { user } = data
  if (!user) return null

  return (
    <>
      <ul>
        <li>
          <img src={user.image ?? ''} width="50px" />
        </li>
        <li>{user.id}</li>
        <li>{user.name}</li>
        <li>{user.nickname}</li>
        <li>{user.description}</li>
        <li>{user.location}</li>
        <li>{user.createdAt}</li>
        <li>{user.updatedAt}</li>
      </ul>
    </>
  )
}

export default UserItem
