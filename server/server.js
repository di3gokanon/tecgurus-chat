//Se agrega el módulo del path-
const path = require('path');
//Se importa el módulo de peticiones http.
const http = require('http');
//Se importa el módulo de express.
const express = require('express');
//Se importa el módulo de socket-io.
const socketIO = require('socket.io');
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