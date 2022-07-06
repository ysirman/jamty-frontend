import { useQuery, useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useState } from 'react'
import {
  UPDATE_JAM,
  UpdateJamData,
  JamInputType,
} from '../graphql/mutations/update-jam.mutation'
import { JamData, JAM_QUERY } from '../graphql/queries/jam.query'
import { Jam } from '../types'

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
    <div>
      <div>
        <button onClick={handleSave}>Save</button>
        {message ? <span className="message">{message}</span> : null}
      </div>
      <span className="form-field">
        <input name="place" value={jam.place} onChange={handleChange} />
      </span>
      <span className="form-field">
        <input
          name="prefectureId"
          value={jam.prefectureId}
          onChange={handleChange}
        />
      </span>
      <span className="form-field">
        <textarea
          name="description"
          value={jam.description}
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

export default EditJamItem
