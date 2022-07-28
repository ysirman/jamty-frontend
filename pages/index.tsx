import * as React from 'react'
import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '../src/Link'
import ProTip from '../src/ProTip'
import Copyright from '../src/Copyright'

import { signIn, signOut, useSession } from 'next-auth/react'
import JamsList from '../components/JamsList'
import WithSession from '@/WithSession'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          MUI v5 + Next.js with TypeScript example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
      {!session && (
        <>
          {loading ? (
            <>Loading ...</>
          ) : (
            <>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
        </>
      )}
      {session && (
        <>
          Signed in as <img src={session.user.image ?? ''} width="50px" />
          {session.user.name} <br />
          AccessToken : {session.accessToken} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}

      <WithSession>
        <h1>
          <Link href={`/mypage`}>MyPage</Link>
        </h1>
      </WithSession>

      <div>
        <h1>
          <Link href={`/users`}>USERS</Link>
        </h1>
      </div>

      <div>
        <h1>
          <Link href={`/jams`}>JAMS</Link>
        </h1>
        <WithSession>
          <Link href={`/jams/new`}>
            <button>New</button>
          </Link>
        </WithSession>
        <JamsList />
      </div>
      <div>
        <h2>
          <Link href="/privacy_policy">プライバシーポリシー</Link>
        </h2>
      </div>
      <div>
        <h2>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdWyBBSleTn1-1bHWSlpWSW1MxA9d-WbhjgdR9zoOuXVCdp4Q/viewform">
            お問い合わせ
          </Link>
        </h2>
      </div>
    </Container>
  )
}

export default Home
