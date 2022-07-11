import { NextPage } from 'next'
import Link from 'next/link'
import WithSession from '@/WithSession'
import NewJamItem from '../../components/NewJamItem'

const NewJamPage: NextPage = () => (
  <WithSession>
    <h1>JAM</h1>
    <NewJamItem />
    <hr />
    <Link href={`/`}>
      <a>Go back</a>
    </Link>
  </WithSession>
)

export default NewJamPage
