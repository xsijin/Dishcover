import { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import BreadCrumb from './components/BreadCrumb/BreadCrumb';
import UserProfile from './components/UserProfile/UserProfile';
import ReviewPage from './components/Reviews/ReviewPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav>
        <a href="/">
          <h1>DISHCOVER</h1>
        </a>
        <BreadCrumb />
      </nav>
      <main>
        <Routes>
          <Route path="/users/show" element={<UserProfile />} />
          <Route path="/ReviewPage" element={<ReviewPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
