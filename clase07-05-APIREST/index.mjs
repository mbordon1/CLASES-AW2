import express from 'express';
import { obtenerProductos, obtenerProductoPorId, eliminarProducto, crearProducto, actualizarProducto } from './funciones.mjs';
///import { productos } from './productos.mjs';

const PUERTO = 3000;
const app = express();
app.use(express.json()) // avisa a express - sirve para parsear el body de las solicitudes POST y PUT

///Definiendo API REST

// GET/api/v1/productos --> todos
app.get('/api/v1/productos', obtenerProductos);

// GET/api/v1/productos/:id --> uno por id
app.get('/api/v1/productos/:id', obtenerProductoPorId)

// POST/api/v1/productos --> dar de alta un nuevo producto
app.post('/api/v1/productos', crearProducto) 

// PUT/api/v1/productos/:id --> actualizar un producto existente
app.put('/api/v1/productos/:id', actualizarProducto )

// DELETE/api/v1/productos/:id --> eliminar un producto
app.delete('/api/v1/productos/:id', eliminarProducto)

app.listen(PUERTO)