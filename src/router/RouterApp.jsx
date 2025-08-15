import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "../pages/home"
import { Dashboard } from "../pages/dashboard"
import { Login } from "../pages/Login"
import { Register } from "../pages/register"
import { NotFound } from "../pages/notfound"

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrate" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export { RouterApp }