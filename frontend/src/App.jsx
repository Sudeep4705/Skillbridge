import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Userlayout from "./Layouts/Userlayout"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import  { Toaster } from 'react-hot-toast';
import ForgetPassword from "./Pages/ForgetPassword";
import Dashboard from "./Pages/Dashboard";
import ResetPassword from "./Pages/ResetPassword";
import ProtectedRoutes from "./Components/ProtectedRoutes";


function App() {

  return (
    <>
    <BrowserRouter>
    <Toaster position="top-center"/>
    <Routes>
      <Route path="/" element={<Userlayout/>}>
      <Route index element={<Navigate to="/register"/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="forgot-password" element={<ForgetPassword/>}/>
      <Route path="reset-password/:token" element={<ResetPassword/>}/>
      <Route path="dashboard"  element={<ProtectedRoutes>
          <Dashboard/>
        </ProtectedRoutes>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
