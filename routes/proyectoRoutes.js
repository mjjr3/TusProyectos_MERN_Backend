import express from "express";

import {
    obtenerProyecto,
    obtenerProyectos,  
    nuevoProyecto,
    eliminarProyecto,
    eliminarColaborador,
    agregarColaborador,
    editarProyecto
}
    from "../controllers/proyectoController.js";

import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()



router.route("/")
    .get(checkAuth, obtenerProyectos)
    .post(checkAuth, nuevoProyecto)

router.route("/:id")
    .get(checkAuth, obtenerProyecto)
    .delete(checkAuth, eliminarProyecto)
    .put(checkAuth, editarProyecto)

router   
    .post("/agregar-colaborador/:id", checkAuth, agregarColaborador)
    .post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador)

export default router