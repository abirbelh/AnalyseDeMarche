import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Data from './Pages/Data.jsx'
import Report from './Pages/Report.jsx'
import Visualization from './Pages/Visualization.jsx';
import AIModel from './Pages/AIModel.jsx'
import Connexion from './Pages/Connexion.jsx';
import SignIn from './Pages/SignIn.jsx';
import Home from './Pages/Home.jsx';
import GestionAdmin from './Pages/AdminPages/GestionAdmin.jsx';
import GestionUser from './Pages/AdminPages/GestionUser.jsx';
import Admin from './Pages/AdminPages/Admin.jsx';
import Index from './Components/Index.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home  />
  },
  {
    path: "/report",
    element: <Report />,
  },
  {
    path: "/visualisation",
    element: <Visualization  />
  },
  {
    path: "/model",
    element: <AIModel />
  },
  {
    path: "/login",
    element: <Connexion />
  },
  {
    path: "/signin",
    element: <SignIn/>
  },
  {
    path: "/admin/gestion/actualité",
    element: <GestionAdmin/>
  },
  {
    path: "/admin/gestion/user",
    element: <GestionUser/>
  },
  {
    path: "/admin",
    element: <Admin/>
  },
  {
    path: "/index",
    element: <Index/>
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>
);


reportWebVitals();
