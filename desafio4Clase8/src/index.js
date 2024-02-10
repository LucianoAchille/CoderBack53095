import express from 'express'
import cartRouter from './routes/cartRouter.js'
import productRouter from './routes/productsRouter.js'
import { __dirname } from './path.js'

const app = express()
const PORT = 8080

//MW
app.use(express.json())
app.use('/static', express.static(__dirname + '/public'))

//ROUTES
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)


app.listen(PORT, ()=>{
    console.log(`Server escuchando en ${PORT}`)
})

