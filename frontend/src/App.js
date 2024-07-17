import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import axios from 'axios';
import './App.css';

import Home from './Pages/Home';
import Data from './Pages/Data';
import Visualization from './Pages/Visualization';
import AIModel from './Pages/AIModel';
import Report from './Pages/Report';
import Error from './Pages/Error';
import Connexion from './Pages/Connexion';
import SignIn from './Pages/SignIn';
import GestionAdmin from './Pages/AdminPages/GestionAdmin';
import GestionUser from './Pages/AdminPages/GestionUser';
import Admin from './Pages/AdminPages/Admin';
import Index from './Components/Index';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3001/api/utilisateurs/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => setUser(response.data))
      .catch(error => {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
      });
    }
  }, []);

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/data" element={<ProtectedRoute><Data /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
          <Route path="/visualization" element={<ProtectedRoute><Visualization /></ProtectedRoute>} />
          <Route path="/login" element={<Connexion setUser={setUser} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/model" element={<ProtectedRoute><AIModel /></ProtectedRoute>} />
          <Route path="/index" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/*" element={<Error />} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route 
            path="/admin/gestion/actualité" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <GestionAdmin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/gestion/user" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <GestionUser />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;