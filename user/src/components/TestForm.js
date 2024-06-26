import { useState } from 'react'
import { useTestContext } from '../hooks/useTestContext'

import '../styles/InputStyles.css'

const TestForm = () => {
  const { dispatch }  = useTestContext()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const [followers, setFollowers] = useState(null)
  const [following, setFollowing] = useState(null)
  const [listQuantity, setLists] = useState(null)
  const [albumQuantity, setAlbums] = useState(null)
  const [reviewQuantity, setReviews] = useState(null)

  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    const tests = {
      firstName,
      lastName, 
      password,
      username,
      followers,
      following,
      listQuantity,
      albumQuantity,
      reviewQuantity
      }

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
      setFirstName('')
      setLastName('')
      setPassword('')
      setUsername('')

      setFollowers('')
      setFollowing('')
      setLists('')
      setAlbums('')
      setReviews('')

      setError(null)
      setEmptyFields([])
      console.log('new user added!', json)
      dispatch({type: 'CREATE_TEST', payload: json})
    }
  }

  return (    
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new user</h3>

      <label>First name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        //only gets error class if true
        className={emptyFields.includes('firstName') ? 'error' : ''}
      />

      <label>Last name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        //only gets error class if true
        className={emptyFields.includes('lastName') ? 'error' : ''}
      />
      
      <label>Password:</label>
      <input
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        //only gets error class if true
        className={emptyFields.includes('password') ? 'error' : ''}
      />

      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        //only gets error class if true
        className={emptyFields.includes('username') ? 'error' : ''}
      />

      <label>Followers:</label>
      <input
        type="Number"
        onChange={(e) => setFollowers(e.target.value)}
        value={followers}
        //only gets error class if true
        className={emptyFields.includes('followers') ? 'error' : ''}
      />
      
      <label>Following:</label>
      <input
        type="Number"
        onChange={(e) => setFollowing(e.target.value)}
        value={following}
        //only gets error class if true
        className={emptyFields.includes('following') ? 'error' : ''}
      />

      <label># of Lists:</label>
      <input
        type="Number"
        onChange={(e) => setLists(e.target.value)}
        value={listQuantity}
        //only gets error class if true
        className={emptyFields.includes('listQuantity') ? 'error' : ''}
      />

      <label># of Albums:</label>
      <input
        type="Number"
        onChange={(e) => setAlbums(e.target.value)}
        value={albumQuantity}
        //only gets error class if true
        className={emptyFields.includes('albumQuantity') ? 'error' : ''}
      />

      <label># of Reviews:</label>
      <input
        type="Number"
        onChange={(e) => setReviews(e.target.value)}
        value={reviewQuantity}
        //only gets error class if true
        className={emptyFields.includes('reviewQuantity') ? 'error' : ''}
      />

      

      <button>Add User</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TestForm