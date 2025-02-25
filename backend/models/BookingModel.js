import mongoose from "mongoose";


const modelSchema = new mongoose.Schema({

    client: {type: mongoose.Schema.Types.ObjectId, ref: 'User',  default: null}, // cliente ou requisitante do servico
    provider: {type: mongoose.Schema.Types.ObjectId, ref: 'User',  default: null}, // prestador do servico
    serviceStatus:{type: mongoose.Schema.Types.ObjectId, ref: 'ServiceStatus',  default: null},// "pendente", "confirmado", "concluído", "cancelado"
    price : {type: Number}
},{
    timestamps: true
});

const UserType = mongoose.model('Booking', modelSchema);

export default UserType;