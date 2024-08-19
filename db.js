import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conexión a MongoDB Atlas");
    } catch (error) {
        console.error("Error al conectar con MongoDB Atlas:", error);
    }
};
