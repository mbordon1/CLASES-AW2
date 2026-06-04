import express from 'express'
import cookieParser from 'cookie-parser'

const PUERTO = 3000

const app = express()

app.use(cookieParser('misecreto'))
//Avisamos que debe incluir los datos en el body
app.use(express.json())
/// Codificacion de URL
app.use(express.urlencoded({ extended: true }))

/// front login 
app.use('/login', express.static('./front/front_login'))

function chequearAcceso(req, res, next) {
    const cookie = req.signedCookies.sesion
    if (cookie === 'identificador') {
        next() // tiene acceso, continua
    } else {
        res.redirect('/login') // no tiene cookie, manda al login
    }
}
app.use('/admin',chequearAcceso,express.static('./front/front_admin'))

app.post('/autenticar', (req, res) => {
    //primero verificar las credenciales 
    const {usuario, clave} = req.body

    if(usuario != 'mbordon' || clave != '123456'){
        return res.redirect('/login')
    }
    //Gestionamos cookies 
    //Generar cabeceras para gestion de cookies
    res.cookie('sesion', 'identificador', {
        secure: true, /// https
        httpOnly: true, /// no se puede leer desde js
        sameSite: 'lax', // como se va a leer la cookie con respecto al dominio 
        signed: true, // si la cookie se va a firmar o no 
        maxAge: 1000 * 60 /// en milisegundos
    })
    //Siempre la respuesta final
    // redirect lo vamos a usar solo si el front es html puro 
    res.redirect('/admin')
    // si no es puro -> js para gestionar el formulario
})

app.listen(PUERTO)