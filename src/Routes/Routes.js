import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Contact from '../components/Contact/Contact';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
