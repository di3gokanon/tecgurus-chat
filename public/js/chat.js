var socket = io();

function scrollToBottom() {
	var messages = $('#messages');
	var newMessage = messages.children('li:last-child');

	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

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
	var template = $('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	$('#messages').append(html);
	scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = $('#location-message-template').html();

	var html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});

	$('#messages').append(html);
	scrollToBottom();
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