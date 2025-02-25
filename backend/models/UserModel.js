import mongoose from "mongoose";


const modelSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phoneNumber: {type: Number, required: true, unique: true},
    resetToken: {type: String},
    isAdmin: {type: Boolean, default: false},
    isBanned: {type: Boolean, default: false},
    isApproved: {type: Boolean, default: false},
    location: {type: String},
    latitude: {type: String},
    longitude: {type: String},
    pushToken: {type: String},
    averagescore: {type: Number},
    documentType: {type: String},
    documentNumber: {type: String},
    documentImageFront: {type: String},
    documentImageBack: {type: String},
    userType: {type: mongoose.Schema.Types.ObjectId, ref: 'UserType',  default: null}, // Solicitante and provedor
    province: {type: mongoose.Schema.Types.ObjectId, ref: 'Province',  default: null},
    
},{
    timestamps: true
});

const User = mongoose.model('User', modelSchema);

export default User;