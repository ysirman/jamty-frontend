import { NextPage, NextPageContext } from 'next'
import Link from 'next/link'
import JamItem from '../../components/JamItem'

interface JamPageProps {
  id: string
}

const JamPage: NextPage<JamPageProps> = ({ id }) => (
  <div>
    <h1>JAM</h1>
    <JamItem id={id} />
    <hr />
    <Link href="/">
      <a>Go back</a>
    </Link>
  </div>
)

JamPage.getInitialProps = (ctx: NextPageContext) => {
  const { id } = ctx.query
  // @ts-ignore
  return { id: typeof id === 'string' ? id : id[0] }
}

export default JamPage
