import User from "../models/user.model.js"
import bcrypt from 'bcryptjs';
import { crearTokenAcceso } from "../libs/jwt.js";

export const register =  async(req, res)=>{
    const {nombre, email, pass, telefono, edad, nacimiento} = req.body;

    try{
        const passEnc = await bcrypt.hash(pass, 10)
        const newUser = new User({
            nombre,
            email,
            pass: passEnc, 
            telefono,
            edad,
            nacimiento,
        });
        const userSaved = await newUser.save();
         const token = await crearTokenAcceso({id: userSaved._id})
        res.cookie('token', token);
        res.json({
                id: userSaved._id,
                nombre: userSaved.nombre,
                email: userSaved.email,
                createdAt: userSaved.createdAt,
                updatedAt: userSaved.updatedAt,
        });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
};

export const login =  async(req, res)=>{
    const {email, pass} = req.body;

    try{
        const userFound = await User.findOne({email})
        if (!userFound) return res.status(400).json({message: "Usuario no encontrado"});
        
        const isMatch= await bcrypt.compare(pass, userFound.pass);
        
        if (!isMatch) return res.status(400).json({message: "Contraseña incorrecta"});
        
        const token = await crearTokenAcceso({id: userFound._id})
        res.cookie('token', token);
        res.json({
                id: userFound._id,
                nombre: userFound.nombre,
                email: userFound.email,
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt,
        });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
};

export const logout = (req, res) => {
    res.cookie('token',"",{
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    
    if(!userFound) return res.status(400).json({message: "Usuario no encontrado"});
    
    return res.json({
        id: userFound._id,
        nombre: userFound.nombre,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })

    res.send('profile')
}  