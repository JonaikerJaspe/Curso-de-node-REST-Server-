const { responde, request } = require("express");

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

const usuariosPost = (req, res = responde) => {
	const { nombre, edad } = req.body;

	res.status(201).json({
		msg: "post API - controlador",
		nombre,
		edad,
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
