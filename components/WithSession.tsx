import { ReactElement, cloneElement, Children } from 'react'
import { useSession } from 'next-auth/react'

type WithSessionProps = {
  children: ReactElement | ReactElement[]
  userId?: string
  isOwner?: boolean
}
type WithSessionType = (params: WithSessionProps) => any

const WithSession: WithSessionType = ({ children, userId, isOwner }) => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  if (loading) return null
  if (!session) return null
  if (userId && isOwner && userId != session.userId) return null // 自分が作成したデータのみ許可
  if (userId && !isOwner && userId == session.userId) return null // 自分が作成していないデータのみ許可

  return Children.map(children, (child) => {
    if (!child) return null
    return cloneElement(child, { session: session })
  })
}

export default WithSession
