import { ReactElement, cloneElement, Children } from 'react'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'

type WithSessionProps = {
  children: [ReactElement]
  userId?: number
}

const WithSession: NextPage<WithSessionProps> = ({ children, userId }) => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  if (loading) return null
  if (!session) return null
  if (userId && userId != session.userId) return null

  return Children.map(children, (child) => {
    if (!child) return null
    return cloneElement(child, { session: session })
  })
}

export default WithSession
