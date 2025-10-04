
// useAuth.js (a custom hook or context)

import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/users/me/")
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  return { user, loading };
}



import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth"; // use your custom auth hook

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/users/login" />;
};

export default ProtectedRoute;


import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={() => {
            axios.post("/users/logout/", {}, { withCredentials: true })
              .then(() => window.location.reload());
          }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/users/login">Login</Link>
          <Link to="/users/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}
<Route element={<ProtectedRoute />}>
  <Route path="/video/upload" element={<UploadPage />} />
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
</Route>
