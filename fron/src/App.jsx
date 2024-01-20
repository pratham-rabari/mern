import { useState } from 'react'
import Login from './component/Login'
import Main from './component/Main'
import Sign from './component/Sign'
import { BrowserRouter, Route, Routes } from "react-router-dom"


function App() {

  return (
    <>
 <BrowserRouter>
<Routes>
<Route path='/' element={<Main/>}/>
  <Route path='/Login' element={<Login/>}/>
  <Route path='/Sign' element={<Sign/>}/>
</Routes>
</BrowserRouter>
    </>
  )
}

export default App
