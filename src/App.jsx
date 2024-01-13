import { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav>
        <a href="/">
          <h1>DISHCOVER</h1>
        </a>
      </nav>
      <main>
        <Routes>
          <Route path="/users/show" element={<UserProfile/>} />
        </Routes>
      </main>
    </>
  )
}

export default App
