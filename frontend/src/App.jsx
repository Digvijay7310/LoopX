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

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/video/home" replace />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/video/search" element={<SearchResultsPage />} />
          <Route path="/video/home" element={<HomePage />} />
          <Route path="/video/:id" element={<WatchPage />} />
          <Route path="/video/:id/edit" element={<UpdateAndDeletePage />} />
          <Route path="/users/me" element={<RequestedUserPage />} />
          <Route path="/video/my-videos" element={<MyVideosPage />} />
          <Route path="/users/:username" element={<UserProfilePage />} />
          <Route path="/users/profile/update" element={<UpdateProfilePage />} />
          <Route path="/likes/my-likes" element={<MyLikesPage />} />
          <Route path="/comments/my-comments" element={<MyCommentsPage />} />
          <Route path="/video/upload" element={<VideoUploadPage />} />
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
