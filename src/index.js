import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './components/AppRouter';
import './index.css';
import AdministradorConexion from './servicios/administradorConexion';

const administradorConexion = AdministradorConexion.getInstancia();
const root = ReactDOM.createRoot(document.getElementById('webchat'));
root.render(<AppRouter administradorConexion={administradorConexion} />);

