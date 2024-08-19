import Alojamiento from "../models/anuncio.model.js"

export const obtenerAnuncio = async (req, res) => {
 const anuncio = await Alojamiento.find({
    user: req.user.id
 }).populate('user')
 res.json(anuncio)
};

export const crearAnuncio = async (req, res) => {
    const { titulo, descripcion, detalles, servicios, descripcionLugar} = req.body
    console.log(req.user)

    const newAnuncio = new Alojamiento({
        titulo,
        descripcion,
        detalles,
        servicios,
        descripcionLugar,
        user: req.user.id
    })
    const savedAnuncio = await newAnuncio.save()
    res.json(savedAnuncio)
};

export const obtenerAnuncioId = async (req, res) => {
    const Anuncio = await Alojamiento.findById(req.params.id)
    if (!Anuncio) return res.status(404).json({message: "Anuncio no encontrado"})
    res.json(Anuncio)
};

export const eliminarAnuncio = async (req, res) => {
    const Anuncio = await Alojamiento.findByIdAndDelete(req.params.id)
    if (!Anuncio) return res.status(404).json({message:"Anuncio no encontrado"})
    return res.sendStatus(204);
};

export const actualizarAnuncio = async (req, res) => {
    const Anuncio = await Alojamiento.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    });
    if(!Anuncio) return res.status(404).json({message: "Anuncio no encontrado"})
    res.json(Anuncio)
};