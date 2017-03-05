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
	var formattedTime = moment(message.createdAt).format('h:mm a');
	console.log('Nuevo mensaje...', message);

	var li = $('<li></li>');
	li.text(`${message.from} ${formattedTime}: ${message.text}`);

	$('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var li = $('<li></li>');

	var a = $('<a target="_blank">Mi ubicaci&oacute;n actual</a>');

	li.text(`${message.from} ${formattedTime}: `);
	a.attr('href', message.url);
	li.append(a);
	$('#messages').append(li);
});
/*
socket.emit('createMessage', {
	from: 'Gerardo',
	text: 'Hola'
}, function (data) {
	console.log('Listo!', data);
});
*/

$('#message-form').on('submit', function(e) {
	e.preventDefault();

	var messageTextbox = $('[name=message]');

	socket.emit('createMessage', {
		from: 'Usuario',
		text: messageTextbox.val()
	}, function() {
		messageTextbox.val('');
	});
});

var locationButton = $('#send-location');

locationButton.on('click', function() {
	if(!navigator.geolocation) {
		return alert('La geolocalización no es soportada por tu navegador');
	}

	locationButton.attr('disabled', 'disabled').text('Enviando ubicación...');

	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('Enviar ubicación');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		locationButton.removeAttr('disabled').text('Enviar ubicación');
		alert('No se puede consultar la ubicación');
	});
});