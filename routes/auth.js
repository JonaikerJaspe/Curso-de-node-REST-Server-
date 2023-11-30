const { Router } = require("express");

const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const { login } = require("../controllers/auth");

const router = Router();

router.post("/login", [
    check('correo', 'El correo tiene que ser obligatorio').isEmail(),
    check('password', 'La contraseña tiene que ser obligatoria').not().isEmpty(),
    validarCampos
], login);



module.exports = router;