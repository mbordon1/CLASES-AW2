import fsp from 'fs/promises';
import path from 'node:path';

const ruta = path.join('./usuarios.json');

export async function guardarUsuarios(datos) {
    const contenido = JSON.stringify(datos, null, 4);
    await fsp.writeFile(ruta, contenido, 'utf-8');
    console.log('Usuarios guardados correctamente');
}

export async function leerEImprimirJSON() {
  const contenido = await fsp.readFile(ruta, 'utf-8');
  const datos = JSON.parse(contenido);
  console.log(datos);
}
