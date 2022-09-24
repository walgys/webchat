import './App.css';
import EncabezadoChat from './components/EncabezadoChat';
import CuerpoChat from './components/CuerpoChat';
import PieChat from './components/PieChat';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { CancelOutlined, Minimize } from '@mui/icons-material';
import { Fab, Grow, makeStyles } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import { v4 as uuid } from 'uuid';
import { AuthContext } from './contexts/authContext';
import AdministradorConexion from './servicios/administradorConexion';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const { estado, setEstado, administradorConexion, user } =
    useContext(AuthContext);
    const {sync, session} = estado;
    const [maximizado, setMaximizado] = useState(false);
  const navigate = useNavigate();
  const minMax = () => {
    setMaximizado(!maximizado);
  };

  useEffect(() => {
    if (!estado.sesion || !user) navigate('/');
  }, []);

  useEffect(() => {
    if(sync && session) 
      administradorConexion.sync(session.roomId, user);
      setEstado(prevState=>({...prevState, sync: false}));
  }, [sync])
  

  const propiedadesCompartidas = {
    estado,
    setEstado,
    administradorConexion,
    user,
  };

  return (
    <div style={{ position: 'absolute', bottom: '0', right: '0' }}>
          <Grow
            in={maximizado}
            style={{ transformOrigin: 'bottom' }}
            {...(maximizado ? { timeout: 1500 } : { timeout: 1000 })}
          >
            <div className={maximizado ? 'webchat' : 'webchat minimizado'}>
              <EncabezadoChat {...propiedadesCompartidas} />
              <CuerpoChat {...propiedadesCompartidas} />
              <PieChat {...propiedadesCompartidas} />
            </div>
          </Grow>
          <Fab
            sx={{
              position: 'absolute',
              bottom: maximizado ? 5 : 0,
              right: maximizado ? 5 : 0,
              marginRight: '25px',
              marginBottom: '15px',
            }}
            size={maximizado ? 'medium' : 'large'}
            color={maximizado ? 'error' : 'primary'}
            aria-label="add"
            onClick={minMax}
          >
            {maximizado ? <CancelOutlined /> : <ChatBubbleOutlineIcon />}
          </Fab>   
    </div>
  );
}

export default App;
