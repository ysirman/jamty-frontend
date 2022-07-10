import * as React from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Container from '@mui/material/Container'

import UsersList from '../../components/UsersList'

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <div>
        <h1>USERS</h1>
        <UsersList />
      </div>
      <Link href={`/`}>
        <a>Go back</a>
      </Link>
    </Container>
  )
}

export default Home
