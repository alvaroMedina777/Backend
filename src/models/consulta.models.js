import mongoose from 'mongoose';

const consultaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  compania: { type: String, required: false},
  telefono: { type: String, required: true },
  email: { type: String, required: true },
  consulta: { type: String, required: true },
  respondido: {type: Boolean, default: false},
}, { timestamps: true });

export default mongoose.model('Consulta', consultaSchema);
