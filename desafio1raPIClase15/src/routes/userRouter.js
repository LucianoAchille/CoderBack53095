import { Router } from "express";
import { userModel } from "../models/user.js";

const userRouter = Router()

userRouter.get('/',async(req,res)=>{
    try {
        const users = await userModel.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).semd(`Error al consultar usuarios: ${error}`)
    }
})

userRouter.post('/', async(req,res)=>{
    try {
        const {nombre, apellido, email, edad, password} = req.body
        const resultado = await userModel.create({nombre, apellido, email, edad, password})
        res.status(200).send(resultado)
    } catch (error) {
        res.status(500).send(`Error al crear usuario: ${error}`)
    }
})

export default userRouter