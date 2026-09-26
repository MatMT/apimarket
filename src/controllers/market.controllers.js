import bcrypt from 'bcryptjs';
import { pool } from '../config.js';

export const getUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT id, nombre, correo FROM usuarios');
    res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Algo salio mal' });
  }
};

export const postRegistro = async (req, res) => {
  try {
    const { nombre, correo, clave } = req.body;

    const [existe] = await pool.query(
      'SELECT id FROM usuarios WHERE correo = ?',
      [correo]
    );
    if (existe.length > 0) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }

    const claveHasheada = await bcrypt.hash(clave, 10);
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, correo, clave) VALUES (?, ?, ?)',
      [nombre, correo, claveHasheada]
    );

    res.status(201).json({ message: 'Usuario registrado correctamente', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo salió mal' });
  }
};

export const postLogin = async (req, res) => {
  try {
    const { correo, clave, username, password } = req.body;
    const email = correo || username;
    const pass = clave || password;

    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ? OR nombre = ?', [email, email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    let coincide = false;
    // Soporta contraseña en texto plano o hasheada con bcrypt
    if (rows[0].clave.startsWith('$2a$') || rows[0].clave.startsWith('$2b$')) {
      coincide = await bcrypt.compare(pass, rows[0].clave);
    } else {
      coincide = (pass === rows[0].clave);
    }

    if (!coincide) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    res.json({
      message: 'Encontrado',
      usuario: { id: rows[0].id, nombre: rows[0].nombre, correo: rows[0].correo },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo salió mal' });
  }
};

export const getProductos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos');
    res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Algo salio mal' });
  }
};

export const getProductosId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Algo salio mal' });
  }
};

export const postProductos = async (req, res) => {
  try {
    const nombre = req.body.nombre ?? req.body.name;
    const descripcion = req.body.descripcion ?? req.body.description;
    const precio_costo = req.body.precio_costo ?? req.body.price_cost;
    const precio_venta = req.body.precio_venta ?? req.body.price_sale;
    const cantidad = req.body.cantidad ?? req.body.quantity;
    const fotografia = req.body.fotografia ?? req.body.image;

    const [result] = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio_costo, precio_venta, cantidad, fotografia) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, precio_costo, precio_venta, cantidad, fotografia]
    );

    res.status(201).json({ message: 'Producto Agregado', id: result.insertId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Algo salio mal' });
  }
};

export const putProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const nombre = req.body.nombre ?? req.body.name;
    const descripcion = req.body.descripcion ?? req.body.description;
    const precio_costo = req.body.precio_costo ?? req.body.price_cost;
    const precio_venta = req.body.precio_venta ?? req.body.price_sale;
    const cantidad = req.body.cantidad ?? req.body.quantity;
    const fotografia = req.body.fotografia ?? req.body.image;

    const [result] = await pool.query(
      'UPDATE productos SET nombre = ?, descripcion = ?, precio_costo = ?, precio_venta = ?, cantidad = ?, fotografia = ? WHERE id = ?',
      [nombre, descripcion, precio_costo, precio_venta, cantidad, fotografia, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Algo salió mal' });
  }
};

export const deleteProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Algo salió mal' });
  }
};