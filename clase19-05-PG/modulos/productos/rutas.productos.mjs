///import express from 'express'
import { Router } from 'express'
import * as controlador from "./controlador.productos.mjs"

const rutasProductos = new Router()

//Obtener todos los productos
rutasProductos.get('/api/v1/productos', controlador.obtenerTodos)

//Obtener un producto por id
rutasProductos.get('/api/v1/productos/:id', controlador.obtenerUno)

//Eliminar un producto por id
rutasProductos.delete('/api/v1/productos/:id', controlador.eliminarUno)

export default rutasProductos