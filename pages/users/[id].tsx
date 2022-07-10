import { NextPage, NextPageContext } from 'next'
import Link from 'next/link'
import UserItem from '../../components/UserItem'

interface UserPageProps {
  id: string
}

const UserPage: NextPage<UserPageProps> = ({ id }) => (
  <div>
    <h1>JAM</h1>
    <UserItem id={id} />
    <hr />
    <Link href={`/users`}>
      <a>Go back</a>
    </Link>
  </div>
)

UserPage.getInitialProps = (ctx: NextPageContext) => {
  const { id } = ctx.query
  return { id: typeof id === 'string' ? id : id[0] }
}

export default UserPage
