import { productos } from './productos.mjs';

export function obtenerProductos(req, res) {
    res.json(productos)
}

export function obtenerProductoPorId(req, res) {
    const id_producto = Number(req.params.id);
    const productoFiltrado = productos.filter((producto) => {
        return Number (producto.id) === id_producto
    })
    if(productoFiltrado.length > 0) {
        const respuesta = {
            datos: productoFiltrado,
            url: 'http://localhost:3000/api/v1/productos/' + id_producto,
            status: 200
        }
        res.json(respuesta);
    }
    else {
        res.status(404).json({mensaje: 'Producto no encontrado'})
    }
}

export function crearProducto(req, res) {

}

export function actualizarProducto(req, res) {

}

export function eliminarProducto(req, res) {
    const id_producto = Number(req.params.id);
    const index = productos.findIndex((producto) => Number(producto.id) === id_producto);

    if (index !== -1) {
        const eliminado = productos.splice(index, 1)[0];
        const respuesta = {
            datos: eliminado,
            url: 'http://localhost:3000/api/v1/productos/' + id_producto,
            status: 200,
            mensaje: 'Producto eliminado'
        }
        res.json(respuesta);
    } else {
        res.status(404).json({mensaje: 'Producto no encontrado'})
    }
}

