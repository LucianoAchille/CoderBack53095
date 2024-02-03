import express from "express"
import {ProductManager} from './config/ProductManager.js'

const app = express()
const PORT = 8000
const productManager = new ProductManager('src/data/products.json')

app.listen(PORT, ()=>{
    console.log(`Server escuchando en ${PORT}`)
})

app.get('/',(req,res)=>{
    res.send(`Hola desde express`)
})

app.get('/products',async (req,res)=>{
    let products =  await productManager.getProducts()
    let limit = req.query.limit
    //console.log(limit)
    if(limit <0) res.send("Ingrese un numero valido para los queries")
    else {
        const prodsLimit = products.slice(0, limit)
        res.send(prodsLimit)
    }    
})

app.get('/products/:pid', async(req,res)=>{
    let id = req.params.pid
    //console.log(id)
    let products =  await productManager.getProductById(id)
    //res.send(`Producto con id ${id}:`)
    res.send(products)

})