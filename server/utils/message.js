//Función que permite generar un mensaje de salida del chat.
var generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: new Date().getTime()
	}
};

module.exports = {
	generateMessage: generateMessage
}