import crypto from 'crypto'
import {copyFile, promises as fs} from 'fs';


export class ProductManager {
    constructor(path) {
        this.products = []
        this.path=path
    }
    addProduct = async (newProduct)=>{
        
        let products = await this.readProducts()
        //console.log(products)
        if (this.controlOk(newProduct)){
            let prod = products.find(prod => prod.code === newProduct.code)
            //console.log(prod)
            if (prod) {
                console.log(`Producto con codigo ${newProduct.code} ya existe`)
            }else{
                
                products.push(newProduct)
                console.log(`Producto con codigo ${newProduct.code} agregado exitosamente`)
                await fs.writeFile(this.path,JSON.stringify(products))
            } 
            }
        else console.log("Faltan datos")
        //const id = this.products.findIndex(prod => prod.code === product.code) //findindex devuelve -1 si no encuentra
        
    }
    
    async getProducts () {
        console.log(this.path)
        let products = await this.readProducts()
        return products
    }
    
    readProducts = async ()=>{
        let products = await fs.readFile(this.path,'utf-8');
        return JSON.parse(products)
    }
    controlOk(prod){
        if(!prod.title || !prod.description || !prod.price || !prod.image || !prod.code || !prod.stock) 
            return false
            else return true
        }
    
    getProductById = async(id)=>{
                //console.log(code)
                let products = await this.readProducts()
                //console.log(products[0])
                let product = products.find(el=>el.id === id)
                //console.log(product)
                if (product) return product
                else return `Producto con id ${id} no existe`
               
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



