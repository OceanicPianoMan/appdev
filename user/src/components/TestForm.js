import { useState } from 'react'
import { useTestContext } from '../hooks/useTestContext'

const TestForm = () => {
  const { dispatch }  = useTestContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [quantity, setQuantity] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    const tests = {title, load, quantity}

    const response = await fetch('/api/testroutes', {
      method: 'POST',
      body: JSON.stringify(tests),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setLoad('')
      setQuantity('')
      setError(null)
      setEmptyFields([])
      console.log('new document added!', json)
      dispatch({type: 'CREATE_TEST', payload: json})
    }

  }

  return (
    
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new document</h3>

      <label>Document Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        //only gets error class if true
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Document Load:</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        //only gets error class if true
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Document Quantity:</label>
      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
        //only gets error class if true
        className={emptyFields.includes('quantity') ? 'error' : ''}
      />

      <button>Add Document</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TestForm