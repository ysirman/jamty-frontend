import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import Image from 'next/image'
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
  if (!data) return null
  const { user } = data

  return (
    <>
      <ul>
        <li>
          <Image
            src={user.image ?? ''}
            width="50px"
            height="50px"
            alt="プロフィール画像"
          />
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
