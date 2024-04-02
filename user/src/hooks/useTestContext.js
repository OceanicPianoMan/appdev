import { TestContext } from "../context/TestContext"
import { useContext } from 'react'

export const useTestContext = () => {
  const context = useContext(TestContext)

  if (!context) {
    throw Error('useTestContext must be used inside an TestContextProvider')
  }

  return context
}