import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import UserItem from '../../components/UserItem'

const MyPage: NextPage = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  if (loading) {
    return null
  }

  if (!session) {
    return null
  }

  return (
    <div>
      <h1>MyPage</h1>
      <Link href={`/mypage/account/edit`}>
        <button>プロフィール編集</button>
      </Link>
      {/* @ts-ignore */}
      <UserItem id={session.userId} />
      <hr />
      <Link href={`/`}>
        <a>Go back</a>
      </Link>
    </div>
  )
}

export default MyPage
