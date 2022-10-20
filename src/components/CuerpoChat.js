import { List, Typography } from '@mui/material';
import moment from 'moment';
import { createRef, useEffect, useRef } from 'react';
import './cuerpoChat.scss';
import MensajeEnviado from './MensajeEnviado';
import MensajeRecibido from './MensajeRecibido';
import Menu from './Menu';

const CuerpoChat = (props) => {
  const { estado, setEstado, administradorConexion, user } = props;
  const { sesion } = estado;
  console.log('sesion', sesion)
  const refItem = createRef();

  useEffect(() => {
    refItem.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [sesion]);
  
  const mensajesExternos = sesion?.mensajes?.filter(
          (mensaje) => mensaje.origen !== user?.uid
        );
    
  return (
    
    <div className="cuerpo-chat">
    {sesion &&
          <div key={sesion?.id}>
            <List
              className="lista-chat"
              sx={{
                position: 'relative',
                maxHeight: '500px',
                overflow: 'auto',
              }}
            >
              <Typography
                align="center"
                sx={{ fontSize: '10pt', color: 'dimgrey' }}
              >
                {moment(sesion?.fecha).format('DD/MM/YYYY hh:mm:ss A')}
              </Typography>
              {sesion?.mensajes?.map((mensaje, indice) => {
                console.log(mensaje)
                if (mensaje.origen !== user.uid) {
                    let fromUser = sesion.users.find(sesionUser=>sesionUser.userId === mensaje.origen);
                    
                    return (
                      <MensajeRecibido
                        key={mensaje.id}
                        systemMessage={mensaje.origen === 'system'} 
                        nombreAvatar={fromUser?.userName || 'desconocido'}
                        avatarURL={fromUser?.avatarURL === 'baseAvatar' ? null : fromUser?.avatarURL}
                        type={mensaje.cuerpo.type || ''}
                        texto={mensaje.cuerpo?.texto}
                        hora={moment
                          .unix(mensaje.fecha._seconds)
                          .format('hh:mm A')}
                      />
                    );
                } else {
                  return (
                    <MensajeEnviado
                      key={mensaje.id}
                      texto={mensaje.cuerpo?.texto}
                      type={mensaje.cuerpo?.type || ''}
                      hora={moment
                        .unix(mensaje.fecha._seconds)
                        .format('hh:mm A')}
                      estado={mensaje.cuerpo?.estado}
                    />
                  );
                }
              })}
              <div ref={refItem}></div>
            </List>
          </div>}
        </div>
  );
};

export default CuerpoChat;
