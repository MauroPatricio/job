import mongoose from 'mongoose';

const serviceStatusSchema = new mongoose.Schema(
  {
    step: { type: Number, require: true },
    description: { type: String, require: true },// Pendente, Confirmado, Cancelado, Concluido
    isActive:  { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const ServiceStatus = mongoose.model('ServiceStatus', serviceStatusSchema);

export default ServiceStatus;
