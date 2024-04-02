import { useEffect } from 'react'
import { useTestContext } from '../hooks/useTestContext'

//components
import TestDetails from '../components/TestDetails'
import TestForm from '../components/TestForm'

const Home = () => {
  const {tests, dispatch} = useTestContext()

  
  useEffect(() => {
    const fetchTests = async () => {
      const response = await fetch('/api/testroutes')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_TESTS', payload: json})
      }
    }

  fetchTests()
  }, [dispatch])

  return (
    <div className="home">
      <div className="testContainer">
        {tests && tests.map((test) => (
          <TestDetails key={test._id} test={test} />
        ))}
        <TestForm />
      </div>
      
    </div>
  )
}

export default Home