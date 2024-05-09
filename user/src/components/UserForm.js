import { useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'

const UserForm = () => {
  const { dispatch }  = useUserContext()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [followers, setFollowers] = useState(null)
  const [following, setFollowing] = useState(null)
  const [listQuantity, setList] = useState(null)
  const [albumQuantity, setAlbum] = useState(null)
  const [reviewQuantity, setReview] = useState(null)
  
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    const users = {
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

    const response = await fetch('/api/userroutes', {
      method: 'POST',
      body: JSON.stringify(users),
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

      setFollowers(null)
      setFollowing(null)
      setList(null)
      setAlbum(null)
      setReview(null)

      setError(null)
      setEmptyFields([])
      console.log('new user added!', json)
      dispatch({type: 'CREATE_USER', payload: json})
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
        type="number"
        onChange={(e) => setFollowers(e.target.value)}
        value={followers}
        //only gets error class if true
        className={emptyFields.includes('followers') ? 'error' : ''}
      />

      <label>Following:</label>
      <input
        type="number"
        onChange={(e) => setFollowing(e.target.value)}
        value={following}
        //only gets error class if true
        className={emptyFields.includes('following') ? 'error' : ''}
      />

      <label># of lists:</label>
      <input
        type="number"
        onChange={(e) => setList(e.target.value)}
        value={listQuantity}
        //only gets error class if true
        className={emptyFields.includes('listQuantity') ? 'error' : ''}
      />

      <label># of albums:</label>
      <input
        type="number"
        onChange={(e) => setAlbum(e.target.value)}
        value={albumQuantity}
        //only gets error class if true
        className={emptyFields.includes('albumQuantity') ? 'error' : ''}
      />

      <label># of reviews:</label>
      <input
        type="number"
        onChange={(e) => setReview(e.target.value)}
        value={reviewQuantity}
        //only gets error class if true
        className={emptyFields.includes('reviewQuantity') ? 'error' : ''}
      />

      <button>Add User</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default UserForm