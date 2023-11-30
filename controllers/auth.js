const { response } = require('express')
const Usuario = require('../models/usuario')

const login = (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // verificar si el correo existe




        // Si el usuario esta activo





        // verificar la contraseña





        // Generar el JWT

        res.json({
            msg: "Login ok",

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }

    res.json({
        msg: "Login ok",

    })
}

module.exports = {
    login
}