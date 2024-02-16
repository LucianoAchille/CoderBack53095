import { promises as fs } from 'fs'
import crypto from 'crypto'
import {ProductManager} from '../config/ProductManager.js'

const productManager = new ProductManager

export class CartManager {
    constructor(path) {
        this.path = path
        this.carts=[]
    }

    async createCart(){
        const newcart = {}
        newcart.id=crypto.randomBytes(10).toString('hex')
        newcart.products=[]
        //console.log(newcart)
        const carts = await this.getCarts()
        //console.log(carts)
        carts.push(newcart)
        await fs.writeFile(this.path,JSON.stringify(carts))
        console.log(`Carro agregado`)
    }
    
    async getCarts() {
        const cart = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return cart
    }

    // async addProductByCart(idProducto, quantityParam) {
    //     const cart = JSON.parse(await fs.readFile(this.path, 'utf-8'))

    //     const indice = cart.findIndex(product => product.id == idProducto)

    //     if (indice != -1) {
    //         cart[indice].quantity += quantityParam //5 + 5 = 10, asigno 10 a quantity
    //     } else {
    //         const prod = { id: idProducto, quantity: quantityParam }
    //         cart.push(prod)
    //     }
    //     await fs.writeFile(this.path, JSON.stringify(cart))
    //     return `Producto ${idProducto} cargado correctamente en el carrito`
    // }

    async getCartById(cid) {
        const carts = await this.getCarts()
        //console.log(carts)
        const cart = carts.find(el=>el.id === cid)
        if (cart) return cart
        else return false
    }

    async addProdToCart(cid,pid){
        const cart = await this.getCartById(cid)
        if (cart){
            console.log(cart)
            const prod= cart.productos.find(el=>el.id === pid)
            console.log(prod)
            if(prod){
                prod.quantity=prod.quantity+1
                console.log(prod)
            }
            return cart
        }
        else{
            return `Carro  ${cid} no existe`
        }
    }
}
