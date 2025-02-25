import mongoose from 'mongoose';

const paymentStatusSchema = new mongoose.Schema(
  {
    step: { type: Number, require: true },
    description: { type: String, require: true }, // Pendente, Pago, Nao pago ou falhado
    isActive:  { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const PaymentStatus = mongoose.model('PaymentStatus', paymentStatusSchema);

export default PaymentStatus;
