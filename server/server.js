//Se agrega el módulo del path-
const path = require('path');
//Se importa el módulo de peticiones http.
const http = require('http');
//Se importa el módulo de express.
const express = require('express');
//Se importa el módulo de socket-io.
const socketIO = require('socket.io');
//Se importa el módulo para generar el mensaje.
const {generateMessage, generateLocationMessage} = require('./utils/message');

//Se obtiene el directorio raiz del proyecto mas la carpeta public 
const publicPath = path.join(__dirname, '../public');
//Se configura el puerto para desarrollo y producción con Heroku.
const port = process.env.PORT || 3000;

//Se obtiene la configuración de express.
var app = express();
//Se crea el servidor.
var server = http.createServer(app);

var io = socketIO(server);

//Se utiliza como ruta path del proyecto la página inicial index.html en el directorio public.
app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log(`Nueva conexión de usuario.`);

	/*
	socket.emit('newMessage', {
		from: 'Diego',
		text: 'Nuevo mensaje para TecGurus',
		createdAt: 123123
	});
	*/

	/*
	socket.emit('newEmail', {
		from: 'dpaniagua@tecgurus.net',
		text: 'Hola Diego',
		createAt: 123
	});
	*/

	/*
	socket.on('createEmail', (newEmail) => {
		console.log('Creando Email');
	});
	*/

	//Se muestra el mensaje de bienvenida al chat del usuario.
	socket.emit('newMessage', generateMessage('Administrador', 'Bienvenido al chat de la aplicación'));
	//Se notifica que se acaba de unir un nuevo usuario al chat.
	socket.broadcast.emit('newMessage', generateMessage('Administrador', 'Se unió un nuevo usuario'));
	/*
	socket.broadcast.emit('newMessage', {
		from: 'Administrador',
		text: 'Un nuevo usuario se ha unido al chat',
		createdAt: new Date().getTime()		
	});
	*/

	//Evento del socket para crear un mensaje.
	socket.on('createMessage', (message, callback) => {
		console.log('Creando Mensaje...', message);
		
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});	

	//Socket que crea un mensaje para mandar la ubicación de un usuario.
	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Administrador', coords.latitude, coords.longitude));
	});

	//Socket que se ejecuta cuando el usuario cierra el chat.
	socket.on('disconnect', () => {
		console.log('EL usuario se ha desconectado');
	});	
});

//Se levanta el servidor en el puerto indicado.
server.listen(port, () => {
	console.log(`El servidor esta corriendo en el puerto ${port}`);
});

//Directorio raiz que toma la ubicacion de la carpeta public
console.log(__dirname + '/../public');
console.log(publicPath);