import { Router } from 'express'
import {CartManager} from '../config/CartManager.js'

const cartManager = new CartManager('src/data/cart.json')
const cartRouter = new Router()

cartRouter.get('/', async(req,res)=>{
    try {
        const carts = await cartManager.getCart()
        res.status(200).send(carts)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar productos: ${error}`)
    }

})

export default CartManager