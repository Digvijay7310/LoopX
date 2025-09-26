import './App.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import WatchPage from './Pages/WatchPage'
import UserProfilePage from './Pages/UserProfilePage'
import UpdateProfilePage from './Pages/UpdateProfilePage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/video/home" replace />} />
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/video/home' element={<HomePage />} />
        <Route path='/video/:id' element={<WatchPage />} />
        <Route path='/users/:username' element={<UserProfilePage />}/>
        <Route path='/users/profile/update' element={<UpdateProfilePage />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
