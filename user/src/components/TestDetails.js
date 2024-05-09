import { useTestContext } from '../hooks/useTestContext'

import '../styles/DetailsStyles.css';

const TestDetails = ({ test }) => {
  
  const { dispatch } = useTestContext()

  const handleClick = async () => {
    const response = await fetch('/api/userroutes/' + test._id, {
      method: 'DELETE'
    })

    const json = await response.json()

    if(response.ok) {
      dispatch({type: 'DELETE_TEST', payload: json})
    }

  }

  return(
    <div className="test-details">
      <h4>{test.username}</h4>
      <p><strong>First name: </ strong>{test.firstName}</p>
      <p><strong>Last name: </ strong>{test.lastName}</p>
      <span onClick={handleClick}>Delete</span>
      <p><strong>Followers: </ strong>{test.followers}</p>
      <p><strong>Following: </ strong>{test.following}</p>
      <p><strong># of Lists: </ strong>{test.listQuantity}</p>
      <p><strong># of Albums: </ strong>{test.albumQuantity}</p>
      <p><strong># of Reviews: </ strong>{test.reviewQuantity}</p>
    </div>
    
  )

}

export default TestDetails