const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 3000;
		// Creando 
		this.usuariosPath = "/api/usuarios";
		this.authPath = "/api/auth";
		//Conectar la base de datos
		this.conectarDB();
		//Middlewares
		this.middlewares();
		//Rutas de mi Aplicacion
		this.routes();
	}

	async conectarDB() {
		await dbConnection();
	}

	//Es una funcion que se ejecuta antes de llamar ya sea un controlador o seguir con la ejecucion de mis peticiones
	middlewares() {
		//CORS
		this.app.use(cors());
		//Lectura y parseo del body
		this.app.use(express.json());
		//Directorio Puublico
		this.app.use(express.static("public"));
	}

		//Definiendo las routes	

	routes() {
		this.app.use(this.authPath, require("../routes/auth"));
		this.app.use(this.usuariosPath, require("../routes/usuarios"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Servidor corriendo en el puerto: ", this.port);
		});
	}
}

module.exports = Server;
