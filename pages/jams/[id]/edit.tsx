import { NextPage, NextPageContext } from 'next'
import Link from 'next/link'
import EditJamItem from '../../../components/EditJamItem'

interface EditJamPageProps {
  id: string
}

const EditJamPage: NextPage<EditJamPageProps> = ({ id }) => (
  <div>
    <h1>JAM</h1>
    <EditJamItem id={id} />
    <hr />
    <Link href={`/jams/${id}`}>
      <a>Go back</a>
    </Link>
  </div>
)

EditJamPage.getInitialProps = (ctx: NextPageContext) => {
  const { id } = ctx.query
  // @ts-ignore
  return { id: typeof id === 'string' ? id : id[0] }
}

export default EditJamPage
