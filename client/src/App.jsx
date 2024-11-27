import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home.jsx'
import Recipe from './pages/recipe.jsx'
import Edit from './pages/edit.jsx'
import Create from './pages/create.jsx'
import Menu from './pages/menu.jsx'
import CreateMenu from './pages/createMenu.jsx'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/:slug' element={<Recipe />} ></Route>
        <Route path='/:slug/edit' element={<Edit />}></Route>
        <Route path='/create' element={<Create />} ></Route>
        <Route path='/menus/:slug' element={<Menu />} ></Route>
        <Route path='/menus/create' element={<CreateMenu />} ></Route>
      </Routes>
      <ToastContainer className="top-24"/>
    </>
  )
}

export default App
