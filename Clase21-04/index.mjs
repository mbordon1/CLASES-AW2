import express from 'express';

const PUERTO = 3000;

//Instancia de servidor 
const app = express();

// Verbo y Ruta configurada -> GET / 
app.get('/', (req, res) => {
    res.send('Hola erikkkk');
});

// Verbo y Ruta configurada -> GET / 
app.get('/usuarios', (req, res) => {
    res.end('Hola en /usuarios');
});

// Verbo y Ruta configurada -> POST / 
app.post('/', (req, res) => {
    res.end('Hola en POST /');
});

//Abro puerto para escuchar peticiones
app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`)
});