import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js"


const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario)
    console.log(proyectos)
    res.json(proyectos)
}
const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id
    try {
        const proyectAlmacenado = await proyecto.save()
        res.json(proyectAlmacenado)
    } catch (error) {
        console.log(error)
    }


}
const obtenerProyecto = async (req, res) => {
    const { id } = req.params
    const proyecto = await Proyecto.findById(id)
    if (!proyecto) {
        const error = new Error("No encontrado")
        return res.status(404).json({ msg: error.message })
    }
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {

        const error = new Error("No tienes los permisos para ver este proyecto")
        return res.status(401).json({ msg: error.message })
    }
    //obtener las tareas del proyecto

    const tareas = await Tarea.find().where('proyecto').equals(proyecto._id)
    res.json({
        proyecto,
        tareas
    })
}
const editarProyecto = async (req, res) => {

    const { id } = req.params
    const proyecto = await Proyecto.findById(id)
    if (!proyecto) {
        const error = new Error("No encontrado")
        return res.status(404).json({ msg: error.message })
    }
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {

        const error = new Error("No tienes los permisos para ver este proyecto")
        return res.status(401).json({ msg: error.message })
    }

    proyecto.nombre = req.body.nombre || proyecto.nombre
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega
    proyecto.cliente = req.body.cliente || proyecto.cliente


    try {
        const proyectAlmacenado = await proyecto.save()
        res.json(proyectAlmacenado)
    } catch (error) {
        console.log(error)
    }

}
const eliminarProyecto = async (req, res) => {
    const { id } = req.params
    const proyecto = await Proyecto.findById(id)
    if (!proyecto) {
        const error = new Error("No encontrado")
        return res.status(404).json({ msg: error.message })
    }
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {

        const error = new Error("No tienes los permisos para ver este proyecto")
        return res.status(401).json({ msg: error.message })
    }

    try {
        await Proyecto.deleteOne({ "_id": id })
        res.json({ msg: "Proyecto Eliminado" })
    } catch (error) {
        console.log(error)
    }


}
const agregarColaborador = async (req, res) => {

}
const eliminarColaborador = async (req, res) => {

}

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarColaborador,
    eliminarProyecto,
    agregarColaborador
  
}