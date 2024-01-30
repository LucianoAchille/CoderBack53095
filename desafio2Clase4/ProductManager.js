import crypto from 'crypto'
import {copyFile, promises as fs} from 'fs';


class ProductManager {
    constructor() {
        this.products = []
        this.path="./products.json";
    }
    addProduct = async (title,description,price,image,code,stock)=>{
        //console.log(code)
        let products = await this.readProducts()
        //console.log(products)
        if (this.controlOk){
            //const existe = this.products.includes(prod => prod.code === code) //devuelve V o F
            let prod = products.find(prod => prod.code === code)
            //console.log(prod)
            //console.log(existe)
            if (prod) {
                console.log(`Producto con codigo ${code} ya existe`)
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
                newProduct.id = crypto.randomBytes(10).toString('hex')
                products.push(newProduct)
                console.log(`Producto con codigo ${code} agregado exitosamente`)
                await fs.writeFile(this.path,JSON.stringify(products))
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

    updateProduct = async(id,title,description,price,image,code,stock) => {
        if(this.controlOk){
            let products= await this.readProducts()
            let prod = products.find(prod => prod.id === id)
            if (!prod) {
                console.log(`Producto con codigo ${id} no existe`)
                }
            else{
                let newProducts = products.filter(prod=> prod.id !== id)
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
                newProduct.id = id
                newProducts.push(newProduct)
                console.log(newProducts)
                await fs.writeFile(this.path,JSON.stringify(newProducts))
                console.log(`Producto con codigo ${id} actualizado exitosamente`)
            } 
        }
        else{
            console.log('Faltan datos')
        }
    }

    deleteProduct = async  (id) =>{
        let products= await this.readProducts()
        let prod = products.find(prod => prod.id === id)
        if(prod){
            let newProducts = products.filter(prod=> prod.id !== id)
            //console.log(newProducts)
            await fs.writeFile(this.path,JSON.stringify(newProducts))
            console.log(`Producto con id ${id} eliminado exitosamente`)
            
        }
        else console.log(`Producto con id ${id} no existe`)

    }
}

let productos = new ProductManager()
//let code = crypto.randomBytes(10).t)oString('hex')
//console.log(code)
//productos.addProduct('titulo3','description3',3333,'image3',code,3000)
//productos.getProducts()
//productos.addProduct('titulo1','description1',111,'image1','1111',1000);
//productos.addProduct('titulo2','description2',222,'image2','2222',2000);
//productos.addProduct('titulo5','description5','5555','image5','5',5000);
//productos.updateProduct('e2124c3084ab1f326d1b','titulo5','description5','5555','image5','5',5000)//no existe
//productos.updateProduct('810ccbf10f6ce2931ff7','titulo5','description5','5555','image5','55',5000)//no existe
//productos.getProductById('4');
//productos.deleteProduct('e2124c3084ab1f326d1b') //no existe id
//productos.deleteProduct('810ccbf10f6ce2931ff7') //existe id
productos.getProducts()


