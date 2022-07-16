import { ReactElement } from 'react'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'

type WithSessionProps = {
  children: ReactElement
  userId?: number
}

const WithSession: NextPage<WithSessionProps> = ({ children, userId }) => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  if (loading) return null

  if (!session) {
    return null
  }

  if (userId && userId != session.userId) {
    return null
  }

  return children
}

export default WithSession
