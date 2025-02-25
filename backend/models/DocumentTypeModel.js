import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    name: { type: String, require: true }, // BI, Carta de conducao, Passport
    isActive:  { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const DocumentType = mongoose.model('DocumentType', documentSchema);

export default DocumentType;
