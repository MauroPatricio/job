import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    icon: { type: String },
    name: { type: String, require: true }, // Serviços Domésticos, Manutenção e Reparos,  Automotivo, Tecnologia e Informática, Beleza e Estética, Saúde e Bem-Estar
    description: { type: String, require: true },
    isActive:  { type: Boolean, default: true },
    img:  { type: String}
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
