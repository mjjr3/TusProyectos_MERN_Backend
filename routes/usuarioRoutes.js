import express from "express";
import checkAuth from '../middleware/checkAuth.js'
import {
    registrarUsuario,
    autenticarUsuario,
    confirmarUsuario,
    olvidePassword,
    validarToken,
    nuevoPassword,
    perfil
} from "../controllers/usuarioController.js"

const router = express.Router();

router.post('/', registrarUsuario);
router.post('/login', autenticarUsuario);
router.get('/confirmar/:token', confirmarUsuario);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(validarToken).post(nuevoPassword);

//aca uso un middleware para validar que el jwt es valido antes de que acceda a su perfil
router.get('/perfil',checkAuth,perfil);

export default router