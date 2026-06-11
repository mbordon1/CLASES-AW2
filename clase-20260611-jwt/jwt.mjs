import jwt from 'jsonwebtoken'

// SIGN --- firmar el token



//VERIFED --- verificar la firma 

jwt.sign({usuario: 'mbordon'}, 'largaYSuperSecreta', {expiresIn: '1h'}, (error, token) =>{
    console.log(token)
})