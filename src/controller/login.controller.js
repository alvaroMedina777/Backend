import Login from "../models/login.models.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  const { userName, password, email } = req.body;

  try {
    const userFound = await Login.findOne({ email });
    if (userFound) return res.status(400).json(["El correo ya esta en uso"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const newLogin = new Login({
      userName,
      password: passwordHash,
      email,
    });
    const loginSaved = await newLogin.save();
    const token = await createAccessToken({ id: loginSaved._id });

    // Asegúrate de establecer correctamente las cookies
    res.cookie("token", token, {
      httpOnly: true,  // Previene el acceso a la cookie desde JavaScript
      secure: process.env.NODE_ENV === "production",  // Solo en HTTPS en producción
      sameSite: "Strict", // Evita que se envíen cookies en solicitudes de otros sitios
      maxAge: 24 * 60 * 60 * 1000, // Expira en 1 día
    });

    res.json({
      id: loginSaved._id,
      userName: loginSaved.userName,
      email: loginSaved.email,
      createdAt: loginSaved.createdAt,
      updatedAt: loginSaved.updatedAt,
    });
  } catch (error) {
    console.error("Error al registrar:", error);
    res
      .status(500)
      .json({ message: "Error al registrar", error: error.message });
  }
};

export const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const loginFound = await Login.findOne({ email });
    if (!loginFound)
      return res.status(400).json({ message: "usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, loginFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "contraseña incorrecta" });

    const token = await createAccessToken({ id: loginFound._id });

    // Asegúrate de establecer correctamente las cookies
    res.cookie("token", token, {
      httpOnly: false,  // Previene el acceso a la cookie desde JavaScript
      secure: process.env.NODE_ENV === "production",  // Solo en HTTPS en producción
      sameSite: "Strict", // Evita que se envíen cookies en solicitudes de otros sitios
      maxAge: 24 * 60 * 60 * 1000, // Expira en 1 día
    });

    res.json({
      id: loginFound._id,
      userName: loginFound.userName,
      email: loginFound.email,
      createdAt: loginFound.createdAt,
      updatedAt: loginFound.updatedAt,
    });
  } catch (error) {
    console.error("Error al registrar:", error);
    res
      .status(500)
      .json({ message: "Error al registrar", error: error.message });
  }
};

// Función para cerrar sesión (logout)
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    res.status(500).json({
      message: "Error al cerrar sesión",
      error: error.message,
    });
  }
};