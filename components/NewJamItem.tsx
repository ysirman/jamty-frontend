import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  CREATE_JAM,
  CreateJamData,
} from '../graphql/mutations/create-jam.mutation'
import { Jam, JamInputType } from '../types'

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
      <div>
        <button onClick={handleSave}>Save</button>
        {message ? <span className="message">{message}</span> : null}
      </div>
      <span className="form-field">
        <input name="place" value={jam?.place} onChange={handleChange} />
      </span>
      <span className="form-field">
        <input
          name="prefectureId"
          value={jam?.prefectureId}
          onChange={handleChange}
        />
      </span>
      <span className="form-field">
        <textarea
          name="description"
          value={jam?.description}
          rows={10}
          onChange={handleChange}
        />
      </span>
      <style jsx>
        {`
          input,
          textarea {
            width: 100%;
          }
          span.form-field {
            display: block;
            overflow: hidden;
            padding: 0 5px 0 0;
            margin: 10px auto;
          }
          button {
            margin-right: 5px;
          }
          span.message {
            font-size: 0.8rem;
            color: #0018f9;
          }
        `}
      </style>
    </div>
  )
}

export default NewJamItem
