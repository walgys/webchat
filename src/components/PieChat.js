import { IconButton, InputBase } from '@mui/material';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SendIcon from '@mui/icons-material/Send';
import React, { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import './pieChat.scss';
import moment from 'moment';

const PieChat = (props) => {
  const [textoEnviar, setTextoEnviar] = useState('');
  const { estado, user, setEstado, administradorConexion } = props;
  const { sesion } = estado;

  const enviarMensaje = () => {
    if (textoEnviar == '') return;
    const message = {
      cuerpo: { texto: textoEnviar },
      fecha: { _seconds: moment().unix() },
      origen: user.uid,
      id: uuid(),
    };
    administradorConexion.enviarMensaje(sesion.id, message, user);
    setTextoEnviar('');
  };
  return (
    <div className="piechat-contenedor">
      <IconButton aria-label="smileys">
        <SentimentSatisfiedOutlinedIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Escriba aqui..."
        inputProps={{ 'aria-label': 'escriba aqui' }}
        onChange={(e) => setTextoEnviar(e.target.value)}
        value={textoEnviar}
      />
      <IconButton>
        <AlternateEmailIcon />
      </IconButton>
      <IconButton onClick={enviarMensaje}>
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default PieChat;
