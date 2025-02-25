import mongoose from "mongoose";


const modelSchema = new mongoose.Schema({
    name: {type: String, required: true},// Prestador ou Solicitante do servico
    description: {type: String, required: true}, // Detalhes de cada tipo
},{
    timestamps: true
});

const UserType = mongoose.model('UserType', modelSchema);

export default UserType;