import { Router } from 'express'
//import {ProductManager} from '../config/ProductManager.js'
import productModel from '../models/products.js'


//const productManager = new ProductManager('src/data/products.json')
const productRouter = new Router()

productRouter.get('/', async(req,res)=>{
    try {
        const {limit, page, filter, ord} = req.query  //limit = req.query.limit contrrolar
        //let limite = parseInt(limit)
        let metFilter;
        const pag = page !== undefined ? page : 1;
        const limi = limit !== undefined ? limit : 10;

        if (filter == "true" || filter == "false") {
            metFilter = "status"
        } else {
            if (filter !== undefined)
                metFilter = "category";
        }
        const query = metFilter != undefined ? { [metFilter]: filter } : {};
        const ordQuery = ord !== undefined ? { price: ord } : {};
        console.log(query)

        //const products = await productModel.find().lean()
        const prods = await productModel.paginate(query, { limit: limi, page: pag, sort: ordQuery });
        console.log(ordQuery)
        // if(!limite) limite = products.length
        // const prodsLimit = products.slice(0,limite)
        res.status(200).send(prods)
    } catch (error) {
        res.status(500).render('templates/error', {
            error: error,
        })
    }

})


productRouter.get('/:pid',async(req,res)=>{
    try {
        const id = req.params.pid
        const prod = await productModel.findById(id)
        if(prod) res.status(200).send(prod)
        else res.status(404).send(`Producto con id ${id} no existe`)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar productos: ${error}`)        
    }

})

productRouter.post('/', async(req,res)=>{
    try {
        const prod = req.body
        //console.log(prod)
        const mensaje = await productModel.create(prod)

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
        const mensaje = await productModel.findByIdAndUpdate(id,prod)

        if(mensaje) res.status(200).send(`Producto con id ${id} actualizado exitosamente`)
        else res.status(404).send(`Producto con id ${id} no existe`)
    } catch (error) {
        res.status(500).send(`Error PUT interno del servidor al consultar productos: ${error}`) 
    }
})

productRouter.delete('/:pid',async (req,res)=>{
    try {
        const id = req.params.pid
        const mensaje = await productModel.findByIdAndDelete(id)
        if(mensaje) res.status(200).send(`Producto con id ${id} eliminado exitosamente`)
        else res.status(404).send(`Producto con id ${id} no existe`)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar productos: ${error}`) 
    }
})

export default productRouter