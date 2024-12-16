import { sendEmail } from "../libs/nodemailer.js";
import Consulta from "../models/consulta.models.js";

// Crear una nueva consulta
export const createConsulta = async (req, res) => {
  const { nombre, apellido, compania, telefono, email, consulta, respondido } = req.body;

  try {
    const nuevaConsulta = new Consulta({
      nombre,
      apellido,
      compania,
      telefono,
      email,
      consulta,
      respondido
    });

    const consultaGuardada = await nuevaConsulta.save();

    const subject = `Nueva consulta de ${nombre} ${apellido}`;
    const message = `Email: ${email}\nMensaje: ${consulta}`;
    await sendEmail(subject, message);

    res.status(201).json({
      message: "Consulta creada exitosamente",
      consulta: consultaGuardada,
    });
  } catch (error) {
    console.error("Error al crear la consulta:", error);
    res.status(500).json({
      message: "Error al crear la consulta",
      error: error.message,
    });
  }
};

// Obtener todas las consultas
export const getConsultas = async (req, res) => {
  try {
    const consultas = await Consulta.find();
    res.status(200).json(consultas);
  } catch (error) {
    console.error("Error al obtener las consultas:", error);
    res.status(500).json({
      message: "Error al obtener las consultas",
      error: error.message,
    });
  }
};

// Obtener una consulta por ID
export const getConsultaById = async (req, res) => {
  const { id } = req.params;

  try {
    const consulta = await Consulta.findById(id);
    if (!consulta)
      return res.status(404).json({ message: "Consulta no encontrada" });

    res.status(200).json(consulta);
  } catch (error) {
    console.error("Error al obtener la consulta:", error);
    res.status(500).json({
      message: "Error al obtener la consulta",
      error: error.message,
    });
  }
};

// Actualizar una consulta por ID
export const updateConsulta = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, compania, telefono, email, consulta, respondido } = req.body;

  try {
    const consultaActualizada = await Consulta.findByIdAndUpdate(
      id,
      {
        nombre,
        apellido,
        compania,
        telefono,
        email,
        consulta,
        respondido,
      },
      { new: true } // Devuelve el documento actualizado
    );

    if (!consultaActualizada)
      return res.status(404).json({ message: "Consulta no encontrada" });

    res.status(200).json({
      message: "Consulta actualizada exitosamente",
      consulta: consultaActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar la consulta:", error);
    res.status(500).json({
      message: "Error al actualizar la consulta",
      error: error.message,
    });
  }
};

// Eliminar una consulta por ID
export const deleteConsulta = async (req, res) => {
  const { id } = req.params;

  try {
    const consultaEliminada = await Consulta.findByIdAndDelete(id);

    if (!consultaEliminada)
      return res.status(404).json({ message: "Consulta no encontrada" });

    res.status(200).json({
      message: "Consulta eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar la consulta:", error);
    res.status(500).json({
      message: "Error al eliminar la consulta",
      error: error.message,
    });
  }
};
