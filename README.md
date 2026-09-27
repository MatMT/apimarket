# APIMARKET — API REST con Node.js, Express y MySQL

**Diseño y Programación de Software Multiplataforma (DPS104)**  
**Guía 11 — App Móvil usando API REST para CRUD**  
Universidad Don Bosco · Ciclo II-2026

---

## 📌 Documentación de Arquitectura y Despliegue

> 📖 **Nota Importante:** Para esta guía se implementó una **solución arquitectónica alternativa 100% gratuita** utilizando **Render.com** (Web Service) y **TiDB Cloud Serverless** (MySQL con TLS/SSL) debido a que Railway eliminó su plan gratuito.  
> 
> 👉 Consulta los detalles técnicos completos, justificación y diagramas en:  
> **[DESPLIEGUE_ALTERNATIVA_RENDER_TIDB.md](./DESPLIEGUE_ALTERNATIVA_RENDER_TIDB.md)**

---

## 🚀 API en Producción

- **URL Base:** `https://apimarket-gunw.onrender.com`
- **Health / Catálogo de Productos:** `https://apimarket-gunw.onrender.com/productos`

---

## 🛠️ Tecnologías y Dependencias

- **Node.js** + **Express**: Servidor web y enrutamiento REST.
- **mysql2/promise**: Cliente MySQL con soporte para promesas y cifrado TLS/SSL.
- **bcryptjs**: Hashing criptográfico de contraseñas para autenticación segura.
- **dotenv**: Manejo de variables de entorno.
- **nodemon**: Recarga en caliente para desarrollo local.

---

## 📋 Endpoints de la API

| Método | Endpoint | Descripción | Body / Parámetros |
|---|---|---|---|
| `POST` | `/usuarios/registro` | Registro de usuario con contraseña cifrada (bcrypt) | `{ nombre, correo, clave }` |
| `POST` | `/usuarios/login` | Login seguro con validación de credenciales | `{ correo, clave }` |
| `GET` | `/usuarios` | Consulta de usuarios | N/A |
| `GET` | `/productos` | Lista todos los productos | N/A |
| `GET` | `/productos/:id` | Detalle de un producto por ID | `id` en URL |
| `POST` | `/productos` | Inserción de un nuevo producto | `{ nombre, descripcion, precio_costo, precio_venta, cantidad, fotografia }` |
| `PUT` | `/productos/:id` | Actualización de datos de producto | Campos a actualizar + `id` en URL |
| `DELETE` | `/productos/:id` | Eliminación de producto | `id` en URL |

---

## 📦 Ejecución en Local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar variables de entorno en un archivo `.env`:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_DATABASE=market
   ```

3. Iniciar el servidor:
   ```bash
   npm run dev
   ```

---

## 📱 Repositorio de la App Móvil

- **Frontend (Expo + React Native + TypeScript):** [https://github.com/MatMT/dpsg11-market-app](https://github.com/MatMT/dpsg11-market-app)
