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
    const nuevoProducto = req.body;
        nuevoProducto.id = productos.length + 1;    
    productos.push(nuevoProducto);
    const respuesta = {
        datos: nuevoProducto,
        url: 'http://localhost:3000/api/v1/productos/' + nuevoProducto.id,
        status: 201,
        mensaje: 'Producto creado'
    }
    res.json(respuesta);
}

export function actualizarProducto(req, res) {
    const id_producto = Number(req.params.id);
    const index = productos.findIndex((producto) => Number(producto.id) === id_producto);   
    if (index !== -1) {
        const productoActualizado = req.body;
        productoActualizado.id = id_producto;
        productos[index] = productoActualizado;
        const respuesta = {
            datos: productoActualizado,
            url: 'http://localhost:3000/api/v1/productos/' + id_producto,
            status: 200,
            mensaje: 'Producto actualizado'
        }
        res.json(respuesta);
    } else {
        res.status(404).json({mensaje: 'Producto no encontrado'})
    }
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

