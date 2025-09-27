import './App.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import WatchPage from './Pages/WatchPage'
import UserProfilePage from './Pages/UserProfilePage'
import UpdateProfilePage from './Pages/UpdateProfilePage'
import RequestedUserPage from './Pages/RequestedUserPage'
import MyLikesPage from './Pages/MyLikesPage'
import MyCommentsPage from './Pages/MyCommentsPage'
import Header from './components/Header'
import SearchResultsPage from './Pages/SearchResultPage'

function App() {

  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<Navigate to="/video/home" replace />} />
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/video/search' element={<SearchResultsPage />}/>
        <Route path='/video/home' element={<HomePage />} />
        <Route path='/video/:id' element={<WatchPage />} />
        <Route path='/users/me' element={<RequestedUserPage />} />
        <Route path='/users/:username' element={<UserProfilePage />}/>
        <Route path='/users/profile/update' element={<UpdateProfilePage />} />
        <Route path='/users/my-likes' element={<MyLikesPage />} />
        <Route path='/users/my-comments' element={<MyCommentsPage />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
