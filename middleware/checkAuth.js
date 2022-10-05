import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
const checkAuth = async (req,res,next) => {
    let token;
    //verifico si viene el token en el header y si comienza con bearer
    if(req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")){
         try {
            //obtengo el token y quito bearer
            token = req.headers.authorization.split(' ')[1];
            
            //obtengo el token decodificado
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            
            //obtengo la info de usuario por id
            //asigno dentro del req.usuario la info para usarla como session
            //filtro los campos para devolver lo que quiero
            req.usuario = await Usuario.findById(decoded.id)
            .select("-password -confirmado -token -createdAt -updatedAt -__v")
            return next();
         } catch (error) {
            console.log(error)
            return res.status(404).json({msg:"Hubo un error"})
         }   
        }
        if(!token){
            const error = new Error("Token no válido")
            return res.status(401).json({msg:error.message})
        }
    next();
}
export default checkAuth