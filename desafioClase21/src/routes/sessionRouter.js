import { Router } from "express";
import { userModel } from "../models/user.js";
import { validatePassword, createHash } from "../utils/bcrypt.js";


const sessionRouter = Router()

sessionRouter.get('/login', async (req, res) => {
    const { email, password } = req.body
    console.log("muestro email y pass: ", email, password)
    try {
        const user = await userModel.findOne({ email: email }).lean()
        //console.log(user)
        if (user && validatePassword(password, user.password)) {
            console.log("muestro req.session.email: ", req.session)            
            req.session.email = email
            if (user.rol == "Admin") {
                req.session.admin = true
                res.status(200).send("Usuario Admin logueado correctamente")
            } else {
                res.status(200).send("Usuario logueado correctamente")
            }
        } else {
            res.status(401).send("Usuario o contraseña no validos")
        }
    } catch (e) {
        console.log(e)
        // res.status(500).send("Error al loguear usuario", e)
    }
})

sessionRouter.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password, age } = req.body
        const findUser = await userModel.findOne({ email: email })
        if (findUser) {
            res.status(400).send("Ya existe un usuario con este mail")
        } else {
            await userModel.create({ first_name: first_name, last_name: last_name, email: email, age: age, password: createHash(password) })
            res.status(200).send("Usuario creado correctamente")
        }

    } catch (e) {
        res.status(500).send("Error al registrar users: ", e)
    }


})

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy(function (e) {
        if (e) {
            console.log(e)
        } else {
            res.status(200).redirect("/")
        }

    })
})

export default sessionRouter