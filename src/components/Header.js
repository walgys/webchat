import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { signOut } from 'firebase/auth';
import { auth } from '../utilitarios/fb';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import { useEffect } from 'react';
export default function Header() {
  const navigate = useNavigate();
  const [isOwner, setIsOwner] = useState();
  const { user, estado, administradorConexion } = useContext(AuthContext);
  const { sesion, enteredChatRoom } = estado;
  console.log(user && user.photoURL);
  const doSignOut = () => {
    signOut(auth);
    handleClose();
    navigate('/');
  };

  useEffect(() => {
    if (sesion?.owner) setIsOwner(sesion.owner === user.uid);
  }, [sesion]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const exitRoom = () => {
    administradorConexion.exitChatRoom(sesion.id, user);
  };
  const closeRoom = () => {
    administradorConexion.closeChatRoom(sesion.id, user);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {enteredChatRoom && (
            <Tooltip title="Salir del chatRoom">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={exitRoom}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}
          {enteredChatRoom && isOwner && (
            <Tooltip title="Cerrar chatRoom">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={closeRoom}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chatty Chatters
          </Typography>

          {user && (
            <Avatar alt="Remy Sharp" src={user.photoURL} onClick={handleMenu} />
          )}
        </Toolbar>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => doSignOut()}>Logout</MenuItem>
        </Menu>
      </AppBar>
    </Box>
  );
}
