import './App.css'
import {Route, Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import WatchPage from './Pages/WatchPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/video/home' element={<HomePage />} />
        <Route path='/video/:id' element={<WatchPage />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
