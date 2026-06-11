// Token de acceso TID AW2 p.366

import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
import pool from './conexion.bd.mjs';

//Inyectar ls variables de entorno al proceso
dotenv.config();

const PUERTO = process.env.PUERTO || 4000;

const app = express();

/// body -> objeto js
app.use(express.json()); // formato json
//Middleware 
app.use(express.urlencoded({extended: true})) // formato urlencoded 
// lee la cabecera de las cookies cuando el cliente lo envia --> SignedCookies --> objeto js 
app.use(cookieParser());

app.post('/registrar', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.sendStatus(400);
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashingPass = bcrypt.hashSync(pass, salt);
        const resultado = await pool.query(
            'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2)',
            [usuario, hashingPass]
        );
        if (resultado.rowCount > 0) {
            res.redirect('/'); // Redirigimos al usuario a la página de login
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).send('El usuario ya existe');
        }
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/autenticar', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.sendStatus(400);
    }
    try {
        const resultado = await pool.query(
            'SELECT * FROM usuarios WHERE username = $1',
            [usuario]
        );
        if (resultado.rowCount === 0) {
            console.log('401: usuario no encontrado:', usuario);
            return res.sendStatus(401);
        }
        const user = resultado.rows[0];
        const passValida = bcrypt.compareSync(pass, user.password_hash);
        if (!passValida) {
            console.log('401: contraseña incorrecta para:', usuario);
            return res.sendStatus(401);
        }

        // 1. Crear el payload (datos que van DENTRO del token)
        const payload = { id: user.id, username: user.username };

        // 2. Firmar el token con la clave secreta
        const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // 3. Enviarlo en una cookie (igual que antes)
        res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

function verificarAcceso(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        console.log('401: no hay cookie token');
        return res.sendStatus(401);
    }
    try {
        const payload = verify(token, process.env.JWT_SECRET);
        req.usuario = payload;
        next();
    } catch (error) {
        console.log('401: token inválido:', error.message);
        return res.sendStatus(401);
    }
}

//Servir ambos fronts
//Admin
app.use('/admin', verificarAcceso,express.static('./fronts/front-admin'))
// Login - registro
app.use(express.static('./fronts/front-login'))

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
