const expect = require('expect');
const {Usuario} = require('./users');

describe('Usuario', () => {
	var users;

	beforeEach(() => {
		users = new Usuario();
		users.users = [{
			id: '1',
			name: 'Diego',
			room: 'Sala de Angular'
		}, {
			id: '2',
			name: 'Gerardo',
			room: 'Sala de Node'
		}, {
			id: '3',
			name: 'César',
			room: 'Sala de Angular'
		}];
	});

	it('Debería de agregar un nuevo usuario', () => {
		var users = new Usuario();
		var user = {
			id: '123',
			name: 'Diego',
			room: 'Tecgurus Room'
		};
		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('Debería de eliminar un usuario', () => {
		var userId = '1';
		var user = users.removeUser(userId);

		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	it('Debería de no eliminar un usuario', () => {
		var userId = '99';
		var user = users.removeUser(userId);

		expect(user).toNotExist();
		expect(users.users.length).toBe(3);		
	});	

	it('Debería de encontrar un usuario', () => {
		var userId = '2';
		var user = users.getUser(userId);
		expect(user.id).toBe(userId);
	});	

	it('Debería de no encontrar un usuario', () => {
		var userId = '99';
		var user = users.getUser(userId);
		expect(user).toNotExist();		
	});	

	it('Debe de regresar los nombres de los usuarios de la Sala de Angular', () => {
		var userList = users.getUserList('Sala de Angular');
		expect(userList).toEqual(['Diego', 'César']);
	});

	it('Debe de regresar los nombres de los usuarios de la Sala de Node', () => {
		var userList = users.getUserList('Sala de Node');
		expect(userList).toEqual(['Gerardo']);
	});



})