import { useQuery, useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useState } from 'react'
import WithSession from '@/WithSession'
import {
  UPDATE_JAM,
  UpdateJamData,
} from '../graphql/mutations/update-jam.mutation'
import { JamData, JAM_QUERY } from '../graphql/queries/jam.query'
import { Jam, JamInputType } from '../types'
import JamForm from './JamForm'

interface EditJamItemProps {
  id: string
}

const EditJamItem: NextPage<EditJamItemProps> = ({ id }) => {
  const [jam, setJam] = useState<Jam>(null)
  const [message, setMessage] = useState<string>('')

  const [updateJam, mutationResult] = useMutation<UpdateJamData, JamInputType>(
    UPDATE_JAM
  )
  const mutationError = mutationResult.error
  const { loading, error, data } = useQuery<JamData>(JAM_QUERY, {
    variables: { id: parseInt(id) },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>
  if (!jam) setJam(data.jam)
  if (!jam) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage('')
    const { name, value } = e.target
    setJam({
      ...jam,
      [name]: value,
    })
  }

  const handleSave = async () => {
    await updateJam({
      variables: {
        id: parseInt(jam.id),
        params: {
          prefectureId: parseInt(jam.prefectureId),
          place: jam.place,
          description: jam.description,
        },
      },
    })

    mutationError
      ? alert(`Error: ${JSON.stringify(mutationError)}`)
      : setMessage('Successfully saved')
  }

  return (
    <WithSession userId={parseInt(jam.userId)} isOwner={true}>
      <JamForm
        jam={jam}
        message={message}
        handleSave={handleSave}
        handleChange={handleChange}
      />
    </WithSession>
  )
}

export default EditJamItem
