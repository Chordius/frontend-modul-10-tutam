import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./App.css";

export default function App() {
  const [cookies] = useCookies(['isLoggedIn']);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={cookies.isLoggedIn ? <Shop /> : <Navigate to="/signup" />} />
          <Route path="*" element={<Navigate to='/shop' />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}