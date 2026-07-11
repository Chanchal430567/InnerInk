import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       <Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={<Profile />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>

<Route
  path="/verify-otp"
  element={<VerifyOTP />}
/>

<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/diary"
  element={
    <ProtectedRoute>
      <Diary />
    </ProtectedRoute>
  }
/>
        
      </Routes>

      <ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={true}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
  theme="light"
  toastStyle={{
    background: "#FFFFFF",
    color: "#3A3A3A",
    borderRadius: "14px",
    borderLeft: "5px solid #5B8FB9",
    boxShadow: "0 8px 25px rgba(0,0,0,.08)",
    fontFamily: "Inter",
  }}
/>

    </BrowserRouter>
  );
}

export default App;