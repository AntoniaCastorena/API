import mongoose from "mongoose";

const DetallesSchema = new mongoose.Schema({
    habitaciones: {
        type: Number,
        min: 1,
        required: true
    },
    camas: {
        type: Number,
        min: 1,
        required: true
    },
    baños: {
        type: Number,
        min: 1,
        required: true
    },
    huespedes: {
        type: Number,
        min: 1,
        required: true
    }
});

const AlojamientoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "El título es obligatorio"],
        trim: true,
        maxlength: 100
    },
    descripcion: {
        type: String,
        required: [true, "La descripción es obligatoria"],
        maxlength: 500 // Limita la longitud
    },
    detalles: DetallesSchema,
    servicios: {
        type: [String], // Ahora es un array de servicios
        required: true
    },
    descripcionLugar: {
        type: String,
        required: [true]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Alojamiento', AlojamientoSchema);
