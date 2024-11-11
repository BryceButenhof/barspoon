import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home.jsx'
import Recipe from './pages/recipe.jsx'
import Create from './pages/create.jsx'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/:slug' element={<Recipe />} ></Route>
        <Route path='/create' element={<Create />} ></Route>
      </Routes>
    </>
  )
}

export default App
