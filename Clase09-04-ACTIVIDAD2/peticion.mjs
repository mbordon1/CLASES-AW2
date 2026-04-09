//Obtener usuarios desde la API

export async function obtenerUsuarios() {
  try {
    const respuesta = await fetch('https://api.escuelajs.co/api/v1/users');
    // Verificar el status DENTRO del try, antes de parsear
    if (!respuesta.ok) {
      throw new Error(`Error en la petición: ${respuesta.status}`);
    }

    const usuarios = await respuesta.json();
    const datosFormateados = usuarios.map(({ id, email, name }) => ({ id, email, name }));
    return datosFormateados;

  } catch (error) {
    // Aca se captura cualquier error: red caida, status malo, JSON inválido, etc.
    console.error('Error al obtener usuarios:', error.message);
    throw error; // re-lanzar para que index.mjs lo maneje
  }
}