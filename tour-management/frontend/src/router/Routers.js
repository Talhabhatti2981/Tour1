
import React, { useContext } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import Home from '../pages/Home';
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails';
import Login  from '../pages/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import ThankYou from '../pages/ThankYou';
import Profile from '../pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import { AuthContext } from '../context/AuthContext';

const Routers = () => {
  const { user } = useContext(AuthContext);

  return (
  <Routes>
    <Route
      path='/'
      element={<Navigate to={user ? '/home' : '/login'} replace />}
    />
    <Route
      path='/home'
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
    <Route
      path="/tours"
      element={
        <ProtectedRoute>
          <Tours />
        </ProtectedRoute>
      }
    />
    <Route
      path='/tours/:id'
      element={
        <ProtectedRoute>
          <TourDetails />
        </ProtectedRoute>
      }
    />
    <Route
      path='/tours/search'
      element={
        <ProtectedRoute>
          <SearchResultList />
        </ProtectedRoute>
      }
    />
    <Route
      path='/thank-you'
      element={
        <ProtectedRoute>
          <ThankYou />
        </ProtectedRoute>
      }
    />
    <Route
      path='/profile'
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path='/login'
      element={user ? <Navigate to="/home" replace /> : <Login />}
    />
    <Route
      path='/register'
      element={user ? <Navigate to="/home" replace /> : <Register />}
    />
  </Routes>
  )
}

export default Routers
