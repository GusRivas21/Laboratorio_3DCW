import mongoose from 'mongoose'
const serviceSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  imagen: String,
  categoria: String
})
export default mongoose.model('Service', serviceSchema)
