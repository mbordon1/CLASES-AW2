import express from 'express';
import { obtenerProductos, obtenerProductoPorId, eliminarProducto } from './funciones.mjs';
///import { productos } from './productos.mjs';

const PUERTO = 3000;
const app = express();

///Definiendo API REST

// GET/api/v1/productos --> todos
app.get('/api/v1/productos', obtenerProductos);

// GET/api/v1/productos/:id --> uno por id
app.get('/api/v1/productos/:id', obtenerProductoPorId)

// POST/api/v1/productos --> dar de alta un nuevo producto
//app.post('/api/v1/productos', )

// PUT/api/v1/productos/:id --> actualizar un producto existente
//app.put('/api/v1/productos/:id', )

// DELETE/api/v1/productos/:id --> eliminar un producto
app.delete('/api/v1/productos/:id', eliminarProducto)


app.listen(PUERTO)