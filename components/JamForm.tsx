import { NextPage } from 'next'
import { Jam } from '../types'

interface JamFormProps {
  jam: Jam
  message: string
  handleSave(): null
  handleChange(): null
}

const JamForm: NextPage<JamFormProps> = ({
  jam,
  message,
  handleSave,
  handleChange,
}) => {
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

export default JamForm
