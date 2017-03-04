var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('Debería de generar el mensaje correcto', () => {
		//Se definen los datos parar generar el mensaje.
		var from = 'TecGurus Consulting';
		var text = 'Algún mensaje';
		var message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, text});


	});
});

describe('generateLocationMessage', () => {
	it('Debéría de mostrar la ubicación GoogleMaps correcta', () => {
		var from = 'TecGurus';
		var latitude = 15;
		var longitude = 19;
		var url = 'https://www.google.com/maps?q=15,19';
		var message = generateLocationMessage(from, latitude, longitude);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, url});
	});
});