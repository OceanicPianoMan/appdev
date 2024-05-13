import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const LoginForm = () => {
  const { dispatch } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate  = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginBody = {
      username,
      password
    };

    try {
      const response = await fetch('/api/userroutes/loginUser', {
        method: 'POST',
        body: JSON.stringify(loginBody),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const returnedData = await response.json();

      console.log('Returned data:', returnedData);

      if (!response.ok) {
        setError(returnedData.error);
        setEmptyFields(returnedData.emptyFields || []);
      } else {
        setPassword('');
        setUsername('');
        setError(null);
        setEmptyFields([]);
        console.log('Login successful!', returnedData);

        // Update context with data from response
        dispatch({ type: 'LOGIN', payload: { sessionID: returnedData.token, username: returnedData.username, userID: returnedData._id } });

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
    <form className="create" onSubmit={handleLogin}>
      <h3>Login</h3>

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

      <button>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default LoginForm;
