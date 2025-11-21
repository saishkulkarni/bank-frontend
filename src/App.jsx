import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Forgot from './pages/auth/Forgot';
import Login from './pages/auth/Login';
import Otp from './pages/auth/Otp';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';


export default function App() {
return (
<div className="bg-dark min-vh-100 text-light p-4">
<Routes>
<Route path="/" element={<Navigate to="/login" />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/otp" element={<Otp />} />
<Route path="/forgot-password" element={<Forgot />} />
<Route path="/reset-password" element={<Reset />} />
</Routes>
<ToastContainer position="top-right" />
</div>
);
}