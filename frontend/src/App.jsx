import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [joke , setJoke] = useState([])

  useEffect(() => {
    return async() => {
      let res = await axios.get('/api/jokes')
      setJoke(res.data)
      console.log(res.data);
    }
  },[])

  return (
    <>
     <div>
        <h1>vivek with backend</h1>
        <p>Jokes:{joke.length}</p>
        {
          joke.map((item , index) => {
            return(
            <div key={index}>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
            )
          })
        }
     </div>
    </>
  )
}

export default App
