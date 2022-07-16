import { useQuery, useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import {
  UPDATE_USER,
  UpdateUserData,
} from '../graphql/mutations/update-user.mutation'
import { UserData, USER_QUERY } from '../graphql/queries/user.query'
import { User, UserInputType } from '../types'
import { Session } from 'next-auth'

interface EditUserItemProps {
  session: Session
}

const EditUserItem: NextPage<EditUserItemProps> = ({ session }) => {
  const [user, setUser] = useState<User>(null)
  const [message, setMessage] = useState<string>('')
  const [updateUser, mutationResult] = useMutation<
    UpdateUserData,
    UserInputType
  >(UPDATE_USER)
  const mutationError = mutationResult.error

  const { loading, error, data } = useQuery<UserData>(USER_QUERY, {
    variables: {
      id: session.userId,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>
  if (!user) setUser(data.user)
  if (!user) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage('')
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  const handleSave = async () => {
    await updateUser({
      variables: {
        params: {
          nickname: user.nickname,
          description: user.description,
          location: user.location,
        },
      },
    })

    mutationError
      ? alert(`Error: ${JSON.stringify(mutationError)}`)
      : setMessage('Successfully saved')
  }

  return (
    <div>
      <h1>プロフィール編集</h1>
      <div>
        <div>
          <button onClick={handleSave}>Save</button>
          {message ? <span className="message">{message}</span> : null}
        </div>
        <span className="form-field">
          <input
            name="nickname"
            value={user?.nickname}
            onChange={handleChange}
          />
        </span>
        <span className="form-field">
          <input
            name="location"
            value={user?.location}
            onChange={handleChange}
          />
        </span>
        <span className="form-field">
          <textarea
            name="description"
            value={user?.description}
            rows={10}
            onChange={handleChange}
          />
        </span>
        <style jsx>
          {`
            input,
            textarea {
              width: 100%;
            }
            span.form-field {
              display: block;
              overflow: hidden;
              padding: 0 5px 0 0;
              margin: 10px auto;
            }
            button {
              margin-right: 5px;
            }
            span.message {
              font-size: 0.8rem;
              color: #0018f9;
            }
          `}
        </style>
      </div>
      <hr />
      <Link href={`/mypage`}>
        <a>Go back</a>
      </Link>
    </div>
  )
}

export default EditUserItem
