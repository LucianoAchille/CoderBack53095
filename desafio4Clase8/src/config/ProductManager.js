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
                return false
            }else{
                newProduct.thumbnail = []
                newProduct.id = crypto.randomBytes(10).toString('hex')
                newProduct.status = true
                products.push(newProduct)
                await fs.writeFile(this.path,JSON.stringify(products))
                console.log(`Producto con codigo ${newProduct.code} agregado exitosamente`)
                return true
                } 
            }
        else return "Faltan datos"
        //const id = this.products.findIndex(prod => prod.code === product.code) //findindex devuelve -1 si no encuentra
        
    }
    
    async getProducts () {
        //console.log(this.path)
        let products = await this.readProducts()
        return products
    }
    
    readProducts = async ()=>{
        let products = await fs.readFile(this.path,'utf-8');
        return JSON.parse(products)
    }
    controlOk(prod){
        if(!prod.title || !prod.description || !prod.price || !prod.code || !prod.stock) 
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

    updateProduct = async(id,product) => {
        if(this.controlOk(product)){
            let products= await this.readProducts()
            //let prodold = products.find(prod => prod.id === id)
            //console.log(product)
            //console.log(prodold)
            let indice = products.findIndex(prod=>prod.id===id)
            //console.log(indice)            
            if(indice != -1){
                products[indice].title=product.title
                products[indice].description=product.description
                products[indice].price=product.price
                products[indice].code=product.code
                products[indice].stock=product.stock
                await fs.writeFile(this.path,JSON.stringify(products))
                console.log(`Producto con codigo ${id} actualizado exitosamente`)
                return true
            }
            else{
                console.log(`Producto con id ${id} no existe`)
                return false
            }
                    
        }
        else{
            return 'Faltan datos'
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
            return true
            
        }
        else {
            console.log(`Producto con id ${id} no existe`)
            return false
        }

    }
}



