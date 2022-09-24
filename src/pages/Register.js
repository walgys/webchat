import { Button, Paper, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import React, { useContext, useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utilitarios/fb';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import { AuthContext } from '../contexts/authContext';

const Register = () => {

    const {user} = useContext(AuthContext);
    const initualValues = {
        phone: '',
        name: '',
        email: '',
        password: '',
      };
     
      const navigate = useNavigate()
      const signUp = async (values) => {
        const {email, password, name} = values;
        await createUserWithEmailAndPassword(auth, email, password); 
      }
      
      useEffect(() => {
        if(user){
            navigate('/home', {replace: true})
        }
      }, [user,navigate])

  return (
    <>
    <Formik
          initialValues={initualValues}
          onSubmit={(values) => signUp(values)}
        >
          {(props) => (
      <Container>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh'}}>
          <Paper elevation={3}>

      <div style={{display: 'flex', justifyContent: 'space-between' ,flexDirection: 'column', width: '25vw', alignContent: 'center', margin: '2rem'}}>
                
              <Typography variant="h5" textAlign={'center'}>
                Regístrese a continuación
              </Typography>
              
              
              <TextField
                variant="standard"
                label="Nombre"
                value={props.values.name}
                onChange={props.handleChange('name')}
                sx={{ alignSelf: 'center', margin: '10px 0px 10px 0px' }}
              />
              <TextField
                variant="standard"
                label="Email"
                value={props.values.email}
                onChange={props.handleChange('email')}
                sx={{ alignSelf: 'center', margin: '10px 0px 10px 0px' }}
              />
              <TextField
                variant="standard"
                type="password"
                value={props.values.password}
                onChange={props.handleChange('password')}
                label="Contraseña"
                sx={{ alignSelf: 'center', margin: '10px 0px 10px 0px' }}
              />
              <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <Button
                sx={{ maxWidth: '300px', alignSelf: 'center', margin: '0rem 1rem 0rem 1rem' }}
                variant='contained'
                color='error'
                onClick={() => navigate('/',{replace: true})}
                >
                Volver
              </Button>
              <Button
                sx={{ maxWidth: '300px', alignSelf: 'center', margin: '0rem 1rem 0rem 1rem' }}
                variant='contained'
                onClick={() => props.handleSubmit()}
                >
                Registrarse
              </Button>
                  </div>
       
            </div>
        </Paper> 
          </div>      
        </Container>
        )}
        </Formik>
    </>
  )
}

export default Register