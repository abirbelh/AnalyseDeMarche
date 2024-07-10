import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"



import Data from './Pages/Data'
import Visualization from './Pages/Visualization'
import AIModel from './Pages/AIModel';
import Report from './Pages/Report';
import Error from './Pages/Error'
import Connexion from './Pages/Connexion';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import GestionAdmin from './Pages/AdminPages/GestionAdmin';
import GestionUser from './Pages/AdminPages/GestionUser';



function App() {
  return (
    <div>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<Data />} />
          <Route path="/report" element={<Report />} />
          <Route path="/visualization" element={<Visualization />} />
          <Route path="/login" element={<Connexion />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/model" element={<AIModel />} />
          <Route path="/*" element={<Error />} />
          <Route path="/admin/gestion/actualité" element={<GestionAdmin />} />
          <Route path="/admin/gestion/user" element={<GestionUser />} />
          
        </Routes>
      </BrowserRouter>


    </div>                                                                                  
  );
}

export default App;
