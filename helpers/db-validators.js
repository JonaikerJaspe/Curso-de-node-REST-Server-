const Role = require("../models/role");
const Usuario = require("../models/usuario");


const esRoleValidor = async (rol = " ") => {
    //Verificar si el rol existe

    const existenRol = await Role.findOne({ rol });
    if (!existenRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD `)
    }
}

const emailExiste = async (correo = "") => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El Correo ${correo} Ya fue registrado en la BD`)
    }

}
const emailUsuarioPorId = async (id) => {
    //Verificar si el Id Existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe: ${id} `)
    }

}

module.exports = {
    esRoleValidor,
    emailExiste,
    emailUsuarioPorId,
}  