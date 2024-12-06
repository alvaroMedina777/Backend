/*LOGIN*/
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
    res.cookie("token", token);
    // res.json({
    //     message:"user creado correctamente"
    // })
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

    res.cookie("token", token);
    // res.json({
    //     message:"user creado correctamente"
    // })
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

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const loginFound = await Login.findById(req.user.id);

  if (!loginFound)
    return res.status(400).json({ message: "usuario no encontrado" });

  return res.json({
    id: loginFound._id,
    userName: loginFound.userName,
    email: loginFound.email,
    createdAt: loginFound.createdAt,
    updatedAt: loginFound.updatedAt,
  });
};

