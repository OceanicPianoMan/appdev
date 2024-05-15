import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const UserForm = () => {
  const { dispatch } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim whitespace from the input values
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedUsername = username.trim();

    const registerUser = {
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      password,
      username: trimmedUsername,
    };

    try {
      const response = await fetch('/api/userroutes/createUser', {
        method: 'POST',
        body: JSON.stringify(registerUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const returnedData = await response.json();

      if (!response.ok) {
        setError(returnedData.error);
        setEmptyFields(returnedData.emptyFields || []);
      } else {
        setFirstName('');
        setLastName('');
        setPassword('');
        setUsername('');
        setError(null);
        setEmptyFields([]);
        console.log('new user added!', returnedData);
        dispatch({
          type: 'REGISTER',
          payload: { sessionID: returnedData.token, username: returnedData.username, userID: returnedData._id },
        });
        // Redirect to user profile page with user's _id
        navigate(`/UserProfile/${returnedData._id}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('Failed to connect to the server');
      setEmptyFields([]);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Register</h3>

      <label>First name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        className={emptyFields.includes('firstName') ? 'error' : ''}
      />

      <label>Last name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        className={emptyFields.includes('lastName') ? 'error' : ''}
      />

      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        className={emptyFields.includes('username') ? 'error' : ''}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className={emptyFields.includes('password') ? 'error' : ''}
      />

      <button>Register</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UserForm;
