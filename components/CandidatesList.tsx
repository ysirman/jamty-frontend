import Link from 'next/link'
import { NextPage } from 'next'
import { User } from '../types'

interface CandidatesListProps {
  candidates: [User]
}

const CandidatesList: NextPage<CandidatesListProps> = ({ candidates }) => {
  if (!candidates) return null

  return (
    <ul>
      {candidates.map((candidate, index) => {
        return (
          <li key={index}>
            {candidate.nickname}{' '}
            <Link href={`/users/${candidate.id}`}>
              <a>[Detail]</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default CandidatesList
