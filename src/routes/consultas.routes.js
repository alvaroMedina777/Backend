import express from "express";
import { createConsulta, deleteConsulta, getConsultaById, getConsultas, updateConsulta } from "../controller/consulta.controller.js";

const router = express.Router();

// Ruta para crear una nueva consulta
router.post("/", createConsulta);

// Ruta para obtener todas las consultas
router.get("/", getConsultas);

// Ruta para obtener una consulta por ID
router.get("/:id", getConsultaById);

// Ruta para actualizar una consulta por ID
router.put("/:id", updateConsulta);

// Ruta para eliminar una consulta por ID
router.delete("/:id", deleteConsulta);

export default router;