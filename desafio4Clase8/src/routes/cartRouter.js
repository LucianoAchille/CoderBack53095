import { Router } from 'express'
import {CartManager} from '../config/CartManager.js'

const cartManager = new CartManager('./src/data/cart.json')
const cartRouter = new Router()

cartRouter.get('/', async(req,res)=>{
    try {
        const carts = await cartManager.getCarts()
        res.status(200).send(carts)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carritos: ${error}`)
    }

})

cartRouter.post('/', async(req,res)=>{
    try {
        //const cart = req.body
        const mensaje = await cartManager.createCart()
        res.status(200).send(`CArro agregado`)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carritos: ${error}`)
    }

})

cartRouter.get('/:cid', async(req,res)=>{
    try {
        const id = req.params.cid
        //console.log(id)
        const cart = await cartManager.getCartById(id)
        if(cart) res.status(200).send(cart)
        else res.status(404).send(`CArrito con id ${id} no existe`)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carritos: ${error}`)   
    }

})

cartRouter.get('/:cid/product/:pid',async(req,res)=>{
    try {
        const idcart = req.params.cid
        const idprod = req.params.pid
        const cart = await cartManager.addProdToCart(idcart,idprod)
        if(cart) res.status(200).send(cart)
        else res.status(404).send(`Carrito con id ${idcart} no existe`)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carritos: ${error}`)  
    }
})

export default cartRouter