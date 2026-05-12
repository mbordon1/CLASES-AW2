import * as modelo from "./modelo.productos.mjs";

export function obtenerTodos(req, res) {
    ///Obtenemos de capa modelo la funcion
    const productos = modelo.obtenerTodos()
    res.json(productos)
}

export function obtenerUno(req, res) {
    //obtener el id del producto a traves de los parametros de la url
    const id_producto = Number(req.params.id)
    //Ejecutamos la funcion del modelo para obtener el producto por id
    const productos = modelo.obtenerUno(id_producto)
    ///Verificamos si el producto existe o no, si existe lo devolvemos, sino devolvemos un mensaje de error
    if (productos.length > 0) {
        res.json(productos)
    } else {
        res.status(404).json({
            mensaje: "Producto no encontrado"
        })
    }
}

export function eliminarUno(req, res) {
    //obtener el id del producto a traves de los parametros de la url
    const id_producto = Number(req.params.id)
    //Ejecutamos la funcion del modelo para eliminar el producto por id
    const productos = modelo.eliminarUno(id_producto)
    ///Verificamos si el producto existe o no, si existe lo eliminamos, sino devolvemos un mensaje de error
    if (productos.length > 0) {
        res.json({
            mensaje: "Producto eliminado correctamente" + " ID: " + id_producto + " eliminado",
            data: productos
        })
    }
    else {
        res.status(404).json({
            mensaje: "Producto no encontrado"
        })
    }
}