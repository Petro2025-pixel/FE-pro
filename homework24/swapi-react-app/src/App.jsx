import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TextWrapper from './components/TextWrapper.jsx'
import Form from './components/Form.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TextWrapper/>
      <Form/>
    </>
  )
}

export default App
