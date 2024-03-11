import { Router } from 'express'
import {ProductManager} from '../config/ProductManager.js'

const productManager = new ProductManager('src/data/products.json')
const productRouter = new Router()

productRouter.get('/', async(req,res)=>{
    try {
        const {limit} = req.query  //limit = req.query.limit contrrolar
        let limite = parseInt(limit)
        const products = await productManager.getProducts()
        if(!limite) limite = products.length
        const prodsLimit = products.slice(0,limite)
        res.status(200).send(prodsLimit)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar productos: ${error}`)
    }

})


productRouter.get('/:pid',async(req,res)=>{
    try {
        const id = req.params.pid
        const prod = await productManager.getProductById(id)
        if(prod) res.status(200).send(prod)
        else res.status(404).send(`Producto con id ${id} no existe`)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar productos: ${error}`)        
    }

})

productRouter.post('/', async(req,res)=>{
    try {
        const prod = req.body
        console.log(prod)
        const mensaje = await productManager.addProduct(prod)
        if(mensaje) res.status(200).send(`Producto con codigo ${prod.code} agregado exitosamente`)
        else res.status(404).send(`Producto con codigo ${prod.code} ya existe`)

    } catch (error) {   
        res.status(500).send(`Error interno del servidor al consultar productos: ${error}`)     
    }
})

productRouter.put('/:pid',async (req,res)=>{
    try {
        const id = req.params.pid
        const prod = req.body
        //console.log(prod)
        const mensaje = await productManager.updateProduct(id,prod)
        if(mensaje) res.status(200).send(`Producto con id ${id} actualizado exitosamente`)
        else res.status(404).send(`Producto con id ${id} no existe`)
    } catch (error) {
        res.status(500).send(`Error PUT interno del servidor al consultar productos: ${error}`) 
    }
})

productRouter.delete('/:pid',async (req,res)=>{
    try {
        const id = req.params.pid
        const mensaje = await productManager.deleteProduct(id)
        if(mensaje) res.status(200).send(`Producto con id ${id} eliminado exitosamente`)
        else res.status(404).send(`Producto con id ${id} no existe`)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar productos: ${error}`) 
    }
})

export default productRouter