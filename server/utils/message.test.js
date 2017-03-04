var expect = require('expect');
var {generateMessage} = require('./message');

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