const { Router } = require("express");
const { check } = require("express-validator");
const { esRoleValidor, emailExiste, emailUsuarioPorId } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosPatch,
	usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", [
	check('id', 'No es un ID Validar').isMongoId(),
	check('id').custom(emailUsuarioPorId),
	check("rol").custom(esRoleValidor),
	validarCampos,
], usuariosPut);
router.post(
	"/",
	[
		check("nombre", "El nombre  es obligarotio").not().isEmpty(),
		check("password", "La password  es obligarotio y mas de 6 letras").isLength({ min: 6 }),
		check("correo").custom(emailExiste),
		// check("rol", "No es un rol Valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
		check("rol").custom(esRoleValidor),
		validarCampos,
	],
	usuariosPost
);
router.delete("/:id", [
	check('id', 'No es un ID Validar').isMongoId(),
	check('id').custom(emailUsuarioPorId),
	validarCampos
], usuariosDelete);
router.patch("/", usuariosPatch);
module.exports = router; 
