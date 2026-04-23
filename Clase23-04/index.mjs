import express from 'express';

const PUERTO = 3000;

const app = express();

//Avisamos a express -> Chequear datos del cliente -> Cuerpo (Configuracion)
//app.use(express.urlencoded({extended: true})); //Para datos de formularios
app.use(express.json()) //Para datos en formato JSON

const productos = [
    {
        id: 1,
        nombre: 'Producto 1',
        precio: 100
    },
    {
        id: 2,
        nombre: 'Producto 2',
        precio: 200
    }
]

const obtenerRaiz = (req, res) => {
    res.end('Estas en la raiz');
}
app.get('/', obtenerRaiz);

app.get('/usuarios', (req, res) => {
    //Objeto js
    const miObjeto = {
        materia: 'AW2'
    }
    res.sendStatus(200);
    //res.json(miObjeto);
    //res.set('Content-Type', 'application/json');
    //String con formato JSON
    //res.send('{"Materia:AW2": "Clase 23-04"}');
});

app.get('/productos', (req, res) => {
    //Objeto js
    res.json(productos);
});

///productos/:id los dos puntos indican que es un parametro dinamico, el id se puede llamar como se quiera
app.get('/productos/:id', (req, res) => {
    //Objeto que guarda el valor del parametro dinamico, en este caso el id, debe llamarse igual que en la ruta
    const id = parseInt(req.params.id);
    //console.log(id);
    //Filtrar el producto por id
    const productosFiltrados = productos.filter(producto => producto.id === id)
    if (productosFiltrados.length > 0) {
        res.json(productosFiltrados);
    }
    else {
        res.json({ "mensaje": 'Producto no encontrado' });
    }
});

//Envio datos al servidor, se utiliza el metodo POST
app.post('/productos', (req, res) => {
    //Verificamos el cuerpo del mensaje 
    const datosCliente = req.body
    productos.push(datosCliente);
    res.status(201).json({ "mensaje": 'Producto creado' });
});

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`)
});