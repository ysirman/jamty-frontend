import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  CREATE_JAM,
  CreateJamData,
} from '../graphql/mutations/create-jam.mutation'
import { Jam, JamInputType } from '../types'
import JamForm from './JamForm'

const NewJamItem: NextPage = () => {
  const router = useRouter()
  const [jam, setJam] = useState<Jam>(null)
  const [message, setMessage] = useState<string>('')

  const [createJam, mutationResult] = useMutation<CreateJamData, JamInputType>(
    CREATE_JAM
  )
  const mutationError = mutationResult.error

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
    const { data } = await createJam({
      variables: {
        params: {
          prefectureId: parseInt(jam.prefectureId),
          place: jam.place,
          description: jam.description,
        },
      },
    })

    mutationError
      ? alert(`Error: ${JSON.stringify(mutationError)}`)
      : router.replace(`/jams/${data?.createJam?.jam?.id}`)
  }

  return (
    <div>
      <JamForm
        jam={jam}
        message={message}
        handleSave={handleSave}
        handleChange={handleChange}
      />
    </div>
  )
}

export default NewJamItem
