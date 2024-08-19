import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js';
import { obtenerAnuncio, crearAnuncio, obtenerAnuncioId, eliminarAnuncio, actualizarAnuncio } from "../controllers/anuncio.controller.js";
const router = Router()

router.get('/anuncio', authRequired, obtenerAnuncio)
router.get('/anuncio/:id', authRequired, obtenerAnuncioId)
router.post('/anuncio', authRequired, crearAnuncio)
router.delete('/anuncio/:id', authRequired, eliminarAnuncio)
router.put('/anuncio/:id', authRequired, actualizarAnuncio )

export default router