import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from '../pages/Login';
import Register from '../pages/Register';
import Webchat from '../pages/Webchat';
import { auth } from '../utilitarios/fb';
import { AuthContext } from '../contexts/authContext';
import App from '../App';
import Header from './Header';


const AppRouter = (props) => {
    const [user, setUser] = useState();
    const [estado, setEstado] = useState({openSessions: [], openSessionsSearch: true, animation: true, chatMaximizado: false});
    const {administradorConexion} = props;
    auth.onAuthStateChanged((user) => {
        if(user){
          setUser(user);
          console.log(user);
        }else{
          setUser(null);
        }
      });

   const IsAuth = ({children}) =>{
    if(user){
        return children;
    }
    return <Login />
} 

  return (
    <AuthContext.Provider
        value={{ user, estado, setEstado, administradorConexion }}
      >
    <Router>
      <Header />
        <Routes>
            <Route path='/' element={<IsAuth><Webchat /></IsAuth>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/chat' element={<App />} />
         </Routes>
    </Router>
      </AuthContext.Provider>
  )
}

export default AppRouter