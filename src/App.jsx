import { useState } from 'react'
import Landing from './components/LandingPage';
import Home from './components/Home '
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
 

  return (
    <>
     <Router>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path='/' element={Landing}/>
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
