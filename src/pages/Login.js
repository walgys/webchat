import { Button, Container, Divider, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
  } from 'firebase/auth';
  import { auth } from '../utilitarios/fb';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const doLogin = async () => {
        try {
          const user = await signInWithEmailAndPassword(auth, userName, password);
        } catch (err) {
          console.log(err);
        }
      };
    
      const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
      };

  return (
    <Container>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh'}}>
            <Paper elevation={3}>

        <div style={{display: 'flex', justifyContent: 'space-between' ,flexDirection: 'column', width: '25vw', alignContent: 'center', margin: '2rem'}}>
        <Typography textAlign={'center'}>
                Ingrese su usuario y contraseña
              </Typography>

              <TextField
                variant="standard"
                label="Usuario"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                sx={{ alignSelf: 'center' }}
                />
              <TextField
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Contraseña"
                sx={{ alignSelf: 'center' }}
              />
              <Button
                sx={{
                  width: '100%',
                  maxWidth: '200px',
                  alignSelf: 'center',
                  margin: '1rem 0px 1rem 0px',
                }}
                variant="contained"
                onClick={() => doLogin()}
              >
                Ingresar
              </Button>
              <Divider />
              <Button
                variant="contained"
                color="error"
                sx={{
                  width: '100%',
                  maxWidth: '200px',
                  alignSelf: 'center',
                  padding: '0.5rem 1rem 0.5rem 1rem',
                  margin: '1rem 0rem 1rem 0rem',
                }}
                onClick={() => googleSignIn()}
              >
                <GoogleIcon />
                oogle
              </Button>
              <Typography textAlign={'center'}>
                Si no tiene cuenta
              </Typography>
              <Button
                onClick={() => navigate('/register')}
                sx={{ width: '100%', maxWidth: '200px', alignSelf: 'center', marginTop: '1rem' }}
                variant="outlined"
                >
                Regístrese
              </Button>
            </div>
                  </Paper>
            </div>
    </Container>
  )
}

export default Login