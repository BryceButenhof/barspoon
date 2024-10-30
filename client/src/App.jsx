import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home.jsx'
import Recipe from './pages/recipe.jsx'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/:slug' element={<Recipe />} ></Route>
      </Routes>
    </>
  )
}

export default App
