import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <hr />
      <div class="app-content">
        <Sidebar />
      </div>
    </div>
      
  );
}

export default App
