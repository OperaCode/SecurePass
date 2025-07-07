import { useState } from 'react'
import Landing from './components/landing'
import Home from './components/home'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
 

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
