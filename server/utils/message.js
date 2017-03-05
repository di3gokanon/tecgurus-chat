var moment = require('moment');
//Función que permite generar un mensaje de salida del chat.
var generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: moment().valueOf()
	}
};

var generateLocationMessage = (from, latitude, longitude) => {
	return {
		from,
		url:`https://www.google.com/maps?q=${latitude},${longitude}`,
		createdAt: moment().valueOf()
	}
}

module.exports = {
	generateMessage: generateMessage,
	generateLocationMessage: generateLocationMessage
}