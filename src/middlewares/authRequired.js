export const authRequired = (req, res, next) => {
    const { token } = req.cookies;
  
    if (!token) {
      return res.status(401).json({ message: "No estás autorizado. No se encontró token." });
    }
  
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido." });
      }
  
      req.user = user; // Almacena la información del usuario en el objeto de la solicitud
      next();
    });
  };