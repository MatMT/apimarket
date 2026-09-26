import Router from 'express';
import {
  getUsuarios,
  postLogin,
  postRegistro,
  getProductos,
  postProductos,
  putProductos,
  deleteProductos,
  getProductosId,
} from '../controllers/market.controllers.js';

const router = Router();

// Ruta para consultar usuarios
router.get('/usuarios', getUsuarios);

// Ruta para registro de usuarios
router.post('/usuarios/registro', postRegistro);

// Ruta para iniciar sesión (Login)
router.post('/usuarios/login', postLogin);

// Rutas de productos (CRUD)
router.get('/productos', getProductos);
router.get('/productos/:id', getProductosId);
router.post('/productos', postProductos);
router.put('/productos/:id', putProductos);
router.delete('/productos/:id', deleteProductos);

export default router;