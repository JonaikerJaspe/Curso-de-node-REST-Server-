const { responde, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");


const usuariosGet = async (req = request, res = responde) => {

	const { limite = 5, desde = 0 } = req.query;
	const query = { estado: true }
	// const usuarios = await Usuario.find(query)
	// 	.skip(Number(desde))
	// 	.limit(Number(limite))

	// const total = await Usuario.countDocuments({ estado: true })
	const [total, usuarios] = await Promise.all([
		Usuario.countDocuments(query),
		Usuario.find(query)
			.skip(Number(desde))
			.limit(Number(limite))

	])

	res.json({
		total,
		usuarios
	});
};

const usuariosPost = async (req, res = responde) => {
	//Validar el Correo


	const { nombre, correo, password, rol } = req.body;
	const usuario = new Usuario({ nombre, correo, password, rol });

	//Verificar si el correo existe
	const existeEmail = await Usuario.findOne({ correo });
	if (existeEmail) {
		return res.status(400).json({
			msg: "Ese Correo ya esta registrado",
			usuario
		});
	}

	//encriptar la contraseña
	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync(password, salt);

	//Guardar en BD
	await usuario.save();

	res.json({
		msg: "post API - controlador",
		usuario,
	});
};

const usuariosPut = async (req, res = responde) => {
	const { id } = req.params;
	const { _id, password, google, correo, ...resto } = req.body;

	//TODO Validar Contra base de datos 

	if (password) {
		//encriptar la contrasena
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync(password, salt)
	}

	const usuario = await Usuario.findByIdAndUpdate(id, resto)

	res.json({
		usuario,
	});
};

const usuariosPatch = (req, res = responde) => {
	res.json({
		msg: "patch API - controlador",
	});
};

const usuariosDelete = async (req, res = responde) => {

	const { id } = req.params;

	// const usuario = await Usuario.findByIdAndDelete(id);
	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });



	res.json({
		usuario
	});
};

module.exports = {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosPatch,
	usuariosDelete,
};
