import mongoose from "mongoose";


const modelSchema = new mongoose.Schema({
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'User',  default: null}, // cliente ou requisitante do servico
    provider: {type: mongoose.Schema.Types.ObjectId, ref: 'User',  default: null}, // prestador do servico
    booking: {type: mongoose.Schema.Types.ObjectId, ref: 'Booking',  default: null}, // Registro
    rating: {type: Number}, //  1 a 5 estrelas
    comment: {type: String}, // Commentarios
},{
    timestamps: true
});

const UserType = mongoose.model('Review', modelSchema);

export default UserType;