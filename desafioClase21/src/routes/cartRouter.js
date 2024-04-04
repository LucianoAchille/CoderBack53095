import { Router } from 'express'
//import {CartManager} from '../config/CartManager.js'
import cartModel from '../models/cart.js'
import { product } from '../config/product.js'
import productModel from '../models/products.js'

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
        res.status(201).send(`Carrito agregado con exito`)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carritos: ${error}`)
    }

})

cartRouter.get('/:cid', async(req,res)=>{
    try {
        const id = req.params.cid
        //console.log(id)
        //const cart = await cartManager.getCartById(id)
        const cart = await cartModel.findById(id)
        if(cart) res.status(200).send(cart)
        else res.status(404).send(`Carrito con id "${id}" no existe`)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carritos: ${error}`)   
    }
})

cartRouter.post('/:cid/:pid',async(req,res)=>{
    try {
        //console.log("entre al try")
        const idCart = req.params.cid
        const idProd = req.params.pid
        //console.log(idProd)
        const {quantity} = req.body
        //console.log(quantity)
        //const cart = await cartManager.addProdToCart(idcart,idprod)
        const cart= await cartModel.findById(idCart)
        //console.log('imnprimo', cart)
        const index = cart.products.findIndex(product => product.id_prod == idProd)
        //const prod = await cart.products.findById(idProd)
        //console.log(prod)
        //console.log(index)
        if (index != -1) {
            //Consultar Stock para ver cantidades
            //console.log( cart.products[index].quantity)
            cart.products[index].quantity += quantity //5 + 5 = 10, asigno 10 a quantity
        } else {
            cart.products.push({ id_prod: idProd, quantity: quantity })
        }
        const mensaje = await cartModel.findByIdAndUpdate(idCart, cart)
        res.status(200).send(mensaje)
        // if(cart) res.status(200).send(cart)
        // else res.status(404).send(`Carrito con id ${idcart} no existe`)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carritos: ${error}`)  
    }
})

cartRouter.delete('/:cid', async(req,res)=>{
    try {
        const id=req.params.cid
        const mensaje= await cartModel.findByIdAndDelete(id)
        if(mensaje) res.status(200).send(`Carrito con id ${id} eliminado exitosamente`)
        else res.status(404).send(`Carrito con id ${id} no existe`)

    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carritos: ${error}`)
    }
})

export default cartRouter