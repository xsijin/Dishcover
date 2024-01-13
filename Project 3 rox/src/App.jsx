import { useState } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <nav>
        <a href="/">
          <h1>DISHCOVER</h1>
        </a>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </>
  )
}

export default App
