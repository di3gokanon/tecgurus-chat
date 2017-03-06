const expect = require('expect');
//Se importa el archivo para validar el nombre de usuario y el nombre del cuarto.
const {isRealString} = require('./validation');

describe('isRealString',  () => {
	it('Debería de rechazar los valores que no son cadenas', () => {
		var res = isRealString(98);
		expect(res).toBe(false);
	});

	it('Debería  de rechazar valores de cadenas con espacios.', () => {
		var res = isRealString('   ');
		expect(res).toBe(false);
	});

	it('Debería de permitir cadenas con caracteres sin espacios', () => {
		var res = isRealString('Diego');
		expect(res).toBe(true);
	});		
});
