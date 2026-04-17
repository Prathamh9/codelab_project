import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
import AllPosts from './pages/AllPosts'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace />}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/create-post' element={<CreatePost/>}/>
      <Route path='/all-posts' element={<AllPosts/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
