import React from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Products from '../pages/products/Products'
import Login from '../pages/Login'
import NotFoundPage from '../pages/NotFoundPage'
import Middleware from '../middleware/Middleware'
import { useRecoilValue } from 'recoil'
import { userState } from '../globalStates/RecoilState'
import { AnimatePresence } from 'framer-motion'
import LandingPage from '../pages/landingPage/LandingPage'

export const ListRoute = () => {

  const user = useRecoilValue(userState);
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <AnimatePresence mode="wait">
        <Routes location={location} key={pathname}>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={user ? <Navigate to="/dashboard"/> : <Login />} />
          <Route path="/login" element={<Login />} />
          {user ?
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/landingPage" element={<LandingPage />} />
          </>
          :
            null
          }
        </Routes>
    </AnimatePresence>
  )
}

function MyRoute() {

  return (
    <BrowserRouter>
      <Middleware>
        <ListRoute/>
      </Middleware>
    </BrowserRouter>
  )
}

export default MyRoute