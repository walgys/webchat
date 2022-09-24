const ioClient = require('socket.io-client');

class AdministradorConexion {
  static #instancia;
  #direccionServidor;
  #socket;
  #setEstado;
  #navigate;
  #user;
  constructor() {
    this.#direccionServidor = process.env.REACT_APP_SERVER_ADDRESS;
    this.#socket = ioClient.connect(this.#direccionServidor,{timeout: 5000, transports: ["websocket"]});
    this.#socket.on('connect', this.#procesarMensajeWebsocket);
  }

  static getInstancia() {
    if (!this.#instancia) {
      this.#instancia = new AdministradorConexion();
    }
    return this.#instancia;
  }

  configurar = (setEstado, navigate, user) => {
    this.#setEstado = setEstado;
    this.#navigate = navigate;
    this.#user = user;
  };

  #procesarMensajeWebsocket = (clienteWS) => {
    console.log(`connected to ${this.#direccionServidor}`);

    this.#socket.on('openSessions', (datos) => {
      const objetoDatos = JSON.parse(datos);
      this.#setEstado((prevState) => ({
        ...prevState,
        openSessions: objetoDatos,
        openSessionsSearch: false
      }));
    });

    this.#socket.on('sync', () => {
      this.#setEstado((prevState) => ({
        ...prevState,
        sync: true
      }));
    });

    this.#socket.on('enterChatRoom', (datos) => {
      const sesion = JSON.parse(datos);
      this.#setEstado((prevState) => ({
        ...prevState,
        sesion,
        enteredChatRoom: true
      }));
      this.#navigate('/chat');
    });

    this.#socket.on('exitChatRoom', (data) => {
      const {user, sesion} = JSON.parse(data)
      this.#setEstado((prevState) => ({
        ...prevState,
        sesion,
        enteredChatRoom: false,
        openSessionsSearch: true
      }));
      
      if(user?.uid === this.user?.uid){ 
      this.#navigate('/',{replace: true});
      }
    });

    this.#socket.on('closeChatRoom', () => {
      this.#setEstado((prevState) => ({
        ...prevState,
        enteredChatRoom: false,
        openSessionsSearch: true
      }));    
      this.#navigate('/');
    });

    this.#socket.on('sendMessage', (datos) => {
      const sesion = JSON.parse(datos);
      this.#setEstado((prevState) => ({
        ...prevState,
        sesion
      }));
    })

    this.#socket.on('reportNewMessageToAllInRoom', (datos) => {
      const sesion = JSON.parse(datos);
      this.#setEstado((prevState) => ({
        ...prevState,
        sesion
      }));
    })

  };

  enviarMensaje = (chatRoomId,message,user) => {
    this.#socket.emit('sendMessage', JSON.stringify({chatRoomId, message, user}));
  };

  sync = (chatRoomId,user) => {
    this.#socket.emit('sync', JSON.stringify({chatRoomId, user}));
  };

  createChatroom = (name,user) => {
    this.#socket.emit('createChatroom', JSON.stringify({name, user}));
  };

  openSessions = () => {
    this.#socket.emit('openSessions');
  };

  enterChatRoom = (chatRoomId, user) => {
    this.#socket.emit('enterChatRoom', JSON.stringify({chatRoomId,user}));
  }

  exitChatRoom = (chatRoomId, user) => {
    this.#socket.emit('exitChatRoom', JSON.stringify({chatRoomId,user}));
  }

  closeChatRoom = (chatRoomId, user) => {
    this.#socket.emit('closeChatRoom', JSON.stringify({chatRoomId,user}));
  }

}

export default AdministradorConexion;
