import mongoose from 'mongoose';

const serviceModelSchema = new mongoose.Schema(
  {
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category',  default: null}, // Serviços Domésticos, Manutenção e Reparos,  Automotivo, Tecnologia e Informática, Beleza e Estética, Saúde e Bem-Estar
    name: { type: String, required: true }, // Canalizador
    description: { type: String, required: true }, // Descrição do serviço de canalizacao
    price: { type: Number, required: true }, // Preço do serviço
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Prestador do serviço
    province: {type: mongoose.Schema.Types.ObjectId, ref: 'Province',  default: null}, // Provincia que opera
    location: { type: String, required: true }, // Localização onde o serviço é oferecido
    latitude: { type: String},
    longitude: { type: String},
    availability: { type: Boolean, default: true }, // Disponibilidade do serviço
    logo: { type: String},
    isActive:  { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const ServiceModel = mongoose.model('Service', serviceModelSchema);

export default ServiceModel;
