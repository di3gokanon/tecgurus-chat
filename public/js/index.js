var socket = io();

socket.on('connect', function () {
	console.log('Conectándose...');

	/*
	socket.emit('createEmail', {
		to: 'diego.paniagua.kanon89@gmail.com',
		text: 'Correo de tecgurus'
	});
	*/

	/*
	socket.emit('createMessage', {
		from: 'tecgurus',
		text: 'Curso de NodeJS con sockets'
	});
	*/
});

socket.on('disconnect', function () {
	console.log('Desconectándose del servidor');
});

/*
socket.on('newEmail', function (email) {
	console.log('Nuevo email...', email);
});	
*/
socket.on('newMessage', function (message) {
	console.log('Nuevo mensaje...', message);
});