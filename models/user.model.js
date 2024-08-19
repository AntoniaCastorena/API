import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    pass:{
        type: String,
        required: true,
    },
    telefono:{
        type: Number,
        required: true,
    },
    edad:{
        type: Number,
        required: true
    },
    nacimiento:{
        type: Date,
        required: true
    },}, {
        timestamps: true 
        
})

export default mongoose.model('User', userSchema)