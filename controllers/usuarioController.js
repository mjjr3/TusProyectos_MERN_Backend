import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro,emailOlvidePassword } from "../helpers/email.js";

const registrarUsuario = async (req, res) => {

    //evitar registtros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email: email })
    if (existeUsuario) {
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({ msg: error.message })
    }

    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId();
        await usuario.save()
        emailRegistro({
            email: usuario.email,
            token: usuario.token,
            nombre: usuario.nombre
        })
        res.json({ msg: "Usuario Creado Correctamente, Revisa tu email para confirmar tu cuenta" })
    } catch (error) {
        console.log(error)

    }
}

const autenticarUsuario = async (req, res) => {
    const { email, password } = req.body;
    //comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        const error = new Error("Usuario no existe");
        return res.status(404).json({ msg: error.message })
    }
    //comprobar si el usuario está confirmado
    if (!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({ msg: error.message })
    }
    //comprobar su password
    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)

        })
    } else {
        const error = new Error("El password es incorrecto");
        return res.status(403).json({ msg: error.message })
    }

}

const confirmarUsuario = async (req, res) => {
    //obtengo token
    const { token } = req.params;
    //busco en la bd por ese token
    const usuarioConfirmar = await Usuario.findOne({ token })
    //si no existe lo informo al usuario
    if (!usuarioConfirmar) {
        const error = new Error("Token no válido");
        return res.status(403).json({ msg: error.message })
    }

    try {
        //si existe seteo el confirmado a true
        usuarioConfirmar.confirmado = true;
        //elimino el token para que no vuelvan a usarlo
        usuarioConfirmar.token = "";
        //guardo cambios en la bd
        await usuarioConfirmar.save();
        //informo al usuario
        res.json({ msg: "Usuario confirmado correctamente" })
    } catch (error) {
        console.log(error)
    }
}

const olvidePassword = async (req, res) => {
    const { email, password } = req.body;
    //comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        const error = new Error("Usuario no existe");
        return res.status(404).json({ msg: error.message })
    }
    try {
        usuario.token = generarId();
        await usuario.save();
        emailOlvidePassword({
            email: usuario.email,
            token: usuario.token,
            nombre: usuario.nombre
        })
        res.json({ msg: "Hemos enviado un email con las instrucciones" })
    } catch (error) {
        console.log(error)
    }
}
const validarToken = async (req, res) => {
    const { token } = req.params;
    //comprobar si el usuario existe
    const tokenValido = await Usuario.findOne({ token })
    if (!tokenValido) {
        const error = new Error("Token no válido");
        return res.status(404).json({ msg: error.message })
    }
    try {

        res.json({ msg: "Token válido y el usuario existe" })
    } catch (error) {
        console.log(error)
    }
}
const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ token })
    if (!usuario) {
        const error = new Error("Token no válido");
        return res.status(404).json({ msg: error.message })
    } else {
        usuario.password = password;
        usuario.token = "";
        await usuario.save();
        res.json({ msg: "Password modificado correctamente" })
    }


}
const perfil = async (req, res) => {
    const { usuario } = req
    res.json(usuario)
}
export {
    registrarUsuario,
    autenticarUsuario,
    confirmarUsuario,
    olvidePassword,
    validarToken,
    nuevoPassword,
    perfil
}