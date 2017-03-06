[{
	id: '56fghyuu678g',
	name: 'Diego',
	room: 'TecGurus Room'
}];

//Clase modelo Usuario.
class Usuario {
	//Constructor de la clase.
	constructor() {
		this.users = [];
	}
	//Permite agregar un usuario al chat.
	addUser(id, name, room) {
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}
	//Permite eliminar un usuario del chat
	removeUser(id) {
		var user = this.getUser(id);

		if (user) {
			this.users = this.users.filter((user) => user.id != id);
		}

		return user;
	}
	//Permite consultar un usuario por su id.
	getUser(id) {
		return this.users.filter((user) => {
			return user.id == id;
		})[0];
	}
	//Permite consultar una lista de usuarios que pertenecen a una sala de chat en específico.
	getUserList(room) {
		var users = this.users.filter((user) => {
			return user.room == room;
		});

		var namesArray =  users.map((user) => {
			return user.name;
		});

		return namesArray;
	}
}

module.exports = {Usuario};



// ======== EJEMPLO PARA EXPLICAR A LOS ALUMNOS ===========

/*
//Clase modelo Persona.
class Persona {
	//Constructor de la clase Persona.
	constructor(nombre, edad) {
		this.nombre = nombre;
		this.edad = edad;
	}

	//Permite obtener la descripción del usuario.
	getUserDescription() {
		return `${this.nombre} tiene ${this.edad}.`;
	}
}

var me = new Persona('Diego', 27);
var description = me.getUserDescription();
console.log(description);
*/