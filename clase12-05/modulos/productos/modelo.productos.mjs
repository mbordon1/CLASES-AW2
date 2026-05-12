///Consultas y conexion a la base de datos posteriormente se reemplazara por consultas a la base de datos
// Capa encargada de la logica de negocio, es decir, de las consultas a la base de datos, validaciones, etc.
import { productos } from "../../productos.mjs";

export function obtenerTodos() {
    /*
    Si tomamos los datos de un archivo JSON aqui estaria el ReadFile 
    y el parseo del json 
    */
    return productos
}

export function obtenerUno(id) {
    const id_producto = Number(id)
    const productos_filtrados = productos.datos.filter((producto) => {
        return Number(producto.id) === id_producto
    })
    //Arreglos 
    return productos_filtrados
}

export function eliminarUno(id) {
    const id_producto = Number(id)
    const productos_filtrados = productos.datos.filter((producto) => {
        return Number(producto.id) !== id_producto
    })
    //Arreglos 
    return productos_filtrados
}