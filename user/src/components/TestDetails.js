import { useTestContext } from '../hooks/useTestContext'

const TestDetails = ({ test }) => {
  
  const { dispatch } = useTestContext()

  const handleClick = async () => {
    const response = await fetch('/api/testroutes/' + test._id, {
      method: 'DELETE'
    })

    const json = await response.json()

    if(response.ok) {
      dispatch({type: 'DELETE_TEST', payload: json})
    }

  }

  return(
    <div className="test-details">
      <h4>{test.title}</h4>
      <p><strong>load: </ strong>{test.load}</p>
      <p><strong>quantity: </ strong>{test.quantity}</p>
      <p>{test.createdAt}</p>
      <span onClick={handleClick}>Delete</span>
    </div>
  )

}

export default TestDetails