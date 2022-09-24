import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useCallback, useContext, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Webchat = () => {
    const { estado, setEstado, administradorConexion, user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const {openSessions, openSessionsSearch} = estado;

    useEffect(() => {
      administradorConexion.configurar(setEstado,navigate, user); 
    }, [])
    
useEffect(() => {
  if(openSessionsSearch) administradorConexion.openSessions();
  console.log(estado)
}, [estado])

const enterChatRoom = (id)=>{
  administradorConexion.enterChatRoom(id, user);
}

const handleModal = () => {
  setModal(!modal)
}

const createRoom = () => {
  if(name.length > 5) administradorConexion.createChatroom(name, user);
  setName('')
  handleModal();
}


  return (
    <Container>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh'}}>
     <Typography variant='h3' align='center' width={'35vw'}>Elija una sala de chat abierta o cree una nueva</Typography>
     <Button onClick={()=>administradorConexion.openSessions()}>Refrescar</Button>
     <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem', margin: '1rem', alignItems: 'center', width: '90vw'}}>
      
    {openSessions && openSessions.map(session =>
    <Card key={session.id} sx={{ minWidth: 275, '&:hover': {cursor: 'pointer', background: 'whitesmoke'}}} onClick={()=>enterChatRoom(session.id)}>
      <CardContent>
        <Typography >ChatRoom</Typography>
        <Typography color="text.secondary" variant='h4' gutterBottom>
          {session.room}
        </Typography>
        
        <Typography>Integrantes</Typography>
          {session.users.map((user, index)=><Typography key={user.uid || index} sx={{ mb: 1.5 }} color="text.secondary">{user.userName}</Typography>)}
      </CardContent>
    </Card>)}
    <Fab color="primary" aria-label="add" onClick={handleModal}>
        <AddIcon />
      </Fab>
      </div> 
      </div>
      <Dialog
        open={modal}
        onClose={handleModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿ Cómo desea llamar al Chatroom ?"}
        </DialogTitle>
        <DialogContent>
          <TextField fullWidth value={name} onChange={e=>setName(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModal}>Cancelar</Button>
          <Button onClick={createRoom} autoFocus>
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Webchat