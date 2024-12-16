import jwt from "jsonwebtoken";
import {TOKEN_SECRET} from '../config.js'

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "no estas autorizado" });

    jwt.verify(token, TOKEN_SECRET, (err, user) =>{
        if(err) return res.status(401).json({message: "token invalido"})

        req.user = user
        next()
    })  

};


////////////////////////


/*import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  // Leer el token desde las cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No estás autorizado, token no encontrado" });
  }

  try {
    // Verificar el token
    const user = jwt.verify(token, TOKEN_SECRET);
    req.user = user; // Almacenar el usuario decodificado en la solicitud
    next(); // Continuar con la siguiente función middleware
  } catch (err) {
    // Manejo de errores de verificación
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};*/
