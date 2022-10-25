import express from 'express'
import dotenv from 'dotenv'
import conectarBD from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectosRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'
import cors from 'cors'

//inicializa express
const app = express()

//esto se utiliza para obtener los parametros desde los form mediante post
app.use(express.json())

//para las variables de entorno
dotenv.config();

//habilito cors
const whiteList = [process.env.FRONT_END_URL]
const corsOptions = {
    origin:(origin,callback)=>{
        if(whiteList.includes(origin)){           
            callback(null,true);
        }else{
            callback(new Error('Error de cors'));
        }
    }
}

app.use(cors(corsOptions))

//funcion conectar bd
conectarBD();

//ROUTING
 app.use("/api/usuarios",usuarioRoutes)
 app.use("/api/proyectos",proyectosRoutes)
 app.use("/api/tareas",tareaRoutes)

//levanto el server en el puerto definido en mi variable de entorno
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
})