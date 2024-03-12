import { Router } from 'express'
import {CartManager} from '../config/CartManager.js'
import cartModel from '../models/cart.js'

//const cartManager = new CartManager('./src/data/cart.json')
const cartRouter = new Router()

cartRouter.get('/', async(req,res)=>{
    try {
        const carts = await cartModel.find()
        res.status(200).send(carts)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carritos: ${error}`)
    }

})

cartRouter.post('/', async(req,res)=>{
    try {
        //const cart = req.body
        //const mensaje = await cartManager.createCart()
        const mensaje = await cartModel.create({ products: [] })
        res.status(201).send(`CArro agregado`)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carritos: ${error}`)
    }

})

cartRouter.get('/:cid', async(req,res)=>{
    try {
        const id = req.params.cid
        //console.log(id)
        //const cart = await cartManager.getCartById(id)
        const cart = await cartModel.findById(cartId)
        if(cart) res.status(200).send(cart)
        else res.status(404).send(`CArrito con id ${id} no existe`)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carritos: ${error}`)   
    }

})

cartRouter.post('/:cid/product/:pid',async(req,res)=>{
    try {
        const idCart = req.params.cid
        const idProd = req.params.pid
        const {quantity} = req.body
        //const cart = await cartManager.addProdToCart(idcart,idprod)
        const cart= await cartModel.findById(idCart)
        const index = cart.products.findIndex(product => product.id_prod == idProd)
        if (index != -1) {
            //Consultar Stock para ver cantidades
            cart.products[indice].quantity = quantity //5 + 5 = 10, asigno 10 a quantity
        } else {
            cart.products.push({ id_prod: productId, quantity: quantity })
        }
        const mensaje = await cartModel.findByIdAndUpdate(idCart, cart)
        res.status(200).send(mensaje)
        // if(cart) res.status(200).send(cart)
        // else res.status(404).send(`Carrito con id ${idcart} no existe`)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carritos: ${error}`)  
    }
})

export default cartRouter