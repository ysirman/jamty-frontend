import { NextPage } from 'next'
import Link from 'next/link'
import NewJamItem from '../../components/NewJamItem'

const NewJamPage: NextPage = () => (
  <div>
    <h1>JAM</h1>
    <NewJamItem />
    <hr />
    <Link href={`/`}>
      <a>Go back</a>
    </Link>
  </div>
)

export default NewJamPage
