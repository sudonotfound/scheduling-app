import { useEffect, useState } from 'react'

function App() {
  const [health, setHealth] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/api/health')
      .then(res => res.json())
      .then(data => setHealth(data.status))
  }, [])

  return (
    <div>
      <h1>Scheduling App</h1>
      <p>API Health: {health}</p>
    </div>
  )
}

export default App
