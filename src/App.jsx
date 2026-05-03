import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Characters from "./pages/Characters";
import CharacterReview from "./pages/CharacterReview";
import AdminPanel from "./pages/AdminPanel";
import "./App.css";

export default function App() {
  const [cookies] = useCookies(['isLoggedIn']);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pirate-rail" element={<Main />}/>
          <Route path="/characters" element={<Characters />} />
          <Route path="/character/:id" element={<CharacterReview />} />
          <Route path="/admin" 
            element={cookies.isLoggedIn ? <AdminPanel /> : <Navigate to="/login" />} 
          />
          <Route path="/admin-panel" 
            element={cookies.isLoggedIn ? <AdminPanel /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to='/pirate-rail' />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}