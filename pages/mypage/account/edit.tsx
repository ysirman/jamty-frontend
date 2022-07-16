import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import EditUserItem from '@/EditUserItem'

const EditAccountPage: NextPage = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  if (loading || !session) return null

  return (
    <>
      <EditUserItem session={session} />
    </>
  )
}

export default EditAccountPage
