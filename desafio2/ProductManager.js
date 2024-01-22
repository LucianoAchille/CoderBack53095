import crypto from 'crypto'
import {copyFile, promises as fs} from 'fs';


class ProductManager {
    constructor() {
        this.products = []
        this.path="./products.json";
    }
    addProduct = async (title,description,price,image,code,stock)=>{
        if (this.controlOk){
            const existe = this.products.includes(prod => prod.code === code) //devuelve V o F
            if (existe) {
                return "Producto ya existe"
                }
            else{
                let newProduct ={
                    title,
                    description,
                    price,
                    image,
                    code,
                    stock
                }
                newProduct.title= title
                newProduct.description= description
                newProduct.price=price
                newProduct.image=image
                newProduct.code = code
                newProduct.stock=stock
                this.products.push(newProduct)
                await fs.writeFile(this.path,JSON.stringify(this.products))
            } 
            }
        else console.log("Faltan datos")
        //const id = this.products.findIndex(prod => prod.code === product.code) //findindex devuelve -1 si no encuentra
        
    }
    getProducts = async()=> {
        let products = await this.readProducts()
        console.log(products)
    }
    
    readProducts = async ()=>{
        let products = await fs.readFile(this.path,'utf-8');
        return JSON.parse(products)
    }
    controlOk(title,description,price,image,code,stock){
        if(!title || !description || !price || !image || !code || !stock) 
            return false
            else return true
        }
    
    getProductById = async(code)=>{
                //console.log(code)
                let products = await this.readProducts()
                //console.log(products[0])
                let product = products.find(el=>el.code === code)
                //console.log(product)
                if (product) console.log(product)
                else console.log(`Producto ${code} no existe`)
               
    }
        }

    

let productos = new ProductManager()
let code = crypto.randomBytes(10).toString('hex')
//console.log(code)
//productos.addProduct('titulo3','description3',3333,'image3',code,3000)
//productos.getProducts()
//productos.addProduct('titulo2','description2',222,'image2','a0279e51cc40fc7ca46b',2000);
productos.getProductById('5cff579916a56b7601d8') // Producto que ya existe
productos.getProductById('5cff57') // Producto que no existe


