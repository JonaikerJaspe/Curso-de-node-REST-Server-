const { responde, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");


const usuariosGet = (req = request, res = responde) => {
	const { q, nombre, apikey, page = 1, limit } = req.query;

	res.json({
		msg: "get API - controlador",
		q,
		nombre,
		apikey,
		page,
		limit,
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

const usuariosPut = (req, res = responde) => {
	const id = req.params.id;

	res.json({
		msg: "put API - controlador",
		id,
	});
};

const usuariosPatch = (req, res = responde) => {
	res.json({
		msg: "patch API - controlador",
	});
};

const usuariosDelete = (req, res = responde) => {
	res.json({
		msg: "delete API - controlador",
	});
};

module.exports = {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosPatch,
	usuariosDelete,
};
