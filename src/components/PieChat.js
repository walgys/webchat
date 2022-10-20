import { IconButton, InputBase, Modal } from '@mui/material';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import React, { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import './pieChat.scss';
import moment from 'moment';
import { Box } from '@mui/system';

const PieChat = (props) => {
  const [textoEnviar, setTextoEnviar] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [attachModal, setAttachModal] = useState(false);
  const [downloadPercentage, setDownloadPercentage] = useState(0);
  const { estado, user, setEstado, administradorConexion } = props;
  const { sesion } = estado;
  const storage = getStorage();

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

  const enviarMensajeArchivo = (texto) => {
    const message = {
      cuerpo: { texto, type: 'url' },
      fecha: { _seconds: moment().unix() },
      origen: user.uid,
      id: uuid(),
    };
    administradorConexion.enviarMensaje(sesion.id, message, user);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') enviarMensaje();
  };

  const closeModal = ()=>{
    setAttachModal(false);
    setErrorMessage('');
  }

  const handleUpload = (e) =>{
    const file = e.target.files[0];
    
    const storageRef = ref(storage,`public/${file.name}`);
    const task = uploadBytesResumable(storageRef,file);

    task.on('state_changed', (snapshot) =>{
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setDownloadPercentage(percentage);
    }, 
    (error)=>setErrorMessage(`Ha ocurrido un error: ${error.message}`),
    ()=>{
      getDownloadURL(task.snapshot.ref).then((downloadURL) => {
        enviarMensajeArchivo(downloadURL);
        closeModal()
      })
    });
  }
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
        onKeyDown={(e) => handleKeyDown(e)}
        value={textoEnviar}
      />
      <IconButton>
        <AttachFileIcon onClick={closeModal} />
      </IconButton>
      <IconButton onClick={enviarMensaje}>
        <SendIcon />
      </IconButton>
      <Modal
        open={attachModal}
        onClose={() => setAttachModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <progress value={downloadPercentage} max='100'/>
          <input type="file" onChange={e => handleUpload(e)} />
          {errorMessage}
        </Box>
      </Modal>
    </div>
  );
};

export default PieChat;
