import { promises as fs } from 'fs'
import crypto from 'crypto'

export class CartManager {
    constructor(path) {
        this.path = path
        this.carts=[]
    }

    async addCart(pid){
        newcart.id=crypto.randomBytes(10).toString('hex')
        newcart.products=[]

    }
    
    
    async getCart() {
        const cart = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return cart
    }

    async addProductByCart(idProducto, quantityParam) {
        const cart = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        const indice = cart.findIndex(product => product.id == idProducto)

        if (indice != -1) {
            cart[indice].quantity += quantityParam //5 + 5 = 10, asigno 10 a quantity
        } else {
            const prod = { id: idProducto, quantity: quantityParam }
            cart.push(prod)
        }
        await fs.writeFile(this.path, JSON.stringify(cart))
        return `Producto ${idProducto} cargado correctamente en el carrito`
    }

}
