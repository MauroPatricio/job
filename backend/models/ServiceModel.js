import mongoose from 'mongoose';

const serviceModelSchema = new mongoose.Schema(
  {
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category',  default: null}, // Serviços Domésticos, Manutenção e Reparos,  Automotivo, Tecnologia e Informática, Beleza e Estética, Saúde e Bem-Estar
    name: { type: String, required: true }, // Canalizador
    description: { type: String, required: true }, // Descrição do serviço de canalizacao
    availability: { type: Boolean, default: true }, // Disponibilidade do serviço
    img: { type: String},
    isActive:  { type: Boolean, default: true },
    icon: {type: String}
  },
  {
    timestamps: true,
  }
);

const ServiceModel = mongoose.model('Service', serviceModelSchema);

export default ServiceModel;
