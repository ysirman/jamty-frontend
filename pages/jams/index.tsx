import * as React from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Container from '@mui/material/Container'
import JamsList from '../../components/JamsList'

const JamsListPage: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <div>
        <h1>JAMS</h1>
        <JamsList />
      </div>
      <Link href={`/`}>
        <a>Go back</a>
      </Link>
    </Container>
  )
}

export default JamsListPage
