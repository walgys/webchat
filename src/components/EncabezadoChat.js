import { Typography } from '@mui/material';
import React from 'react';
import './encabezadoChat.scss';

const EncabezadoChat = (props) => {
  const { estado } = props;
  const { idNegocio } = estado;

  return (
    <div className="encabezado-chat-container">
      <Typography variant="body2" align="center" sx={{ fontWeight: '800' }}>
        {idNegocio}
      </Typography>
      <Typography
        align="center"
        sx={{ fontSize: '10pt', fontStyle: 'italic', color: 'dimgrey' }}
      >
        visto hace 15 minutos
      </Typography>
    </div>
  );
};

export default EncabezadoChat;
