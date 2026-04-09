import { obtenerUsuarios } from "./peticion.mjs";
import { guardarUsuarios, leerEImprimirJSON } from "./datos.mjs";

const usuarios = await obtenerUsuarios();
await guardarUsuarios(usuarios);
await leerEImprimirJSON();

