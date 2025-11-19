import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import WatchPage from './Pages/WatchPage';
import UserProfilePage from './Pages/UserProfilePage';
import UpdateProfilePage from './Pages/UpdateProfilePage';
import RequestedUserPage from './Pages/RequestedUserPage';
import MyLikesPage from './Pages/MyLikesPage';
import MyCommentsPage from './Pages/MyCommentsPage';
import SearchResultsPage from './Pages/SearchResultPage';
import SignupPage from './Pages/SignupPage';
import AdminSignupPage from './Pages/AdminSignupPage';
import AdminLoginPage from './Pages/AdminLoginPage';
import AdminDashboardPage from './Pages/AdminDashboardPage';
import VideoUploadPage from './Pages/VideoUploadPage';
import MyVideosPage from './Pages/MyVideosPage';
import UpdateAndDeletePage from './Pages/UpdateAndDeletePage';
import AdminUserDetailsPage from './Pages/AdminUserDetailsPage';
import AdminAllUsers from './Pages/AdminAllUsers';
import Layout from './Layout/Layout';
import NotFoundPage from './Pages/NotFoundPage';
import SubscribedChannels from './Pages/SubscribedChannels';
import SubscribersPage from './Pages/SubscribersPage';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/videos/home" replace />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/videos/search" element={<SearchResultsPage />} />
          <Route path="/videos/home" element={<HomePage />} />
          <Route path="/videos/:id" element={<WatchPage />} />
          <Route path="/videos/:id/edit" element={<UpdateAndDeletePage />} />
          <Route path="/users/me" element={<RequestedUserPage />} />
          <Route path="/videos/my-videos" element={<MyVideosPage />} />
          <Route path="/users/:username" element={<UserProfilePage />} />
          <Route path="/users/profile/update" element={<UpdateProfilePage />} />
          <Route path="/likes/my-likes" element={<MyLikesPage />} />
          <Route path="/comments/my-comments" element={<MyCommentsPage />} />
          <Route path="/videos/upload" element={<VideoUploadPage />} />
          <Route path='/subscription/my-subscriptions' element={<SubscribedChannels />}/>
          <Route path='/subscription/my-subscribers' element={<SubscribersPage />}/>
        </Route>

        <Route path="/admin/signup" element={<AdminSignupPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/all-users" element={<AdminAllUsers />} />
        <Route path="/admin/:username" element={<AdminUserDetailsPage />} />
        <Route path="/admin/all-users-data" element={<AdminDashboardPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
