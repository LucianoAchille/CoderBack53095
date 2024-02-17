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

    async getCartById(cid) {
        const carts = await this.getCarts()
        //console.log(carts)
        const cart = carts.find(el=>el.id === cid)
        if (cart) return cart
        else return false
    }

    async addProdToCart(cid,pid){
        const carts = await this.getCarts()
        const cartIndex= carts.findIndex(cart=>cart.id === cid)
        if(cartIndex!==-1) {
            const cart = carts[cartIndex]
            const prodIndex = cart.products.findIndex(prod=>prod.id===pid)
            if(prodIndex!==-1)  cart.products[prodIndex].quantity+=1
                    else cart.products.push({"id":pid, "quantity":1})
            carts[cartIndex]=cart
            await fs.writeFile(this.path,JSON.stringify(carts)) 
            return cart
          
        }else  return false
    }
}
