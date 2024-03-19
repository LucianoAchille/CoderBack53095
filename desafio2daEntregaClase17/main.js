import { product } from "./product.js";
import { ProductManager } from "./ProductManager.js";


const prod1 = new product('titulo1','description1',111,'image1','1111',1000)
const prod2 = new product('titulo2','description2',222,'image2','2222',2000)
const prod3 = new product('titulo3','description3',333,'image3','3333',3000)

let productos = new ProductManager()
//productos.addProduct(prod1)
// productos.addProduct(prod2)
//productos.addProduct(prod3)
//productos.getProducts()
//const prod5 = new product('titulo5','description5',5555,'image5','5555',5000)
//productos.addProduct(prod5)
//productos.deleteProduct('d859bf32fd2a4530c8c1')
//productos.updateProduct('e21360d1dc3f0ef8813f','titulo3','description3',33333,'image3','3333',33000)
//productos.getProductById('e21360d1dc3f0ef8813f')