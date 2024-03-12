import express from 'express'
import cartRouter from './routes/cartRouter.js'
import productRouter from './routes/productsRouter.js'
import { __dirname } from './path.js'
import mongoose from 'mongoose'
import userRouter from './routes/userRouter.js'
import chatRouter from './routes/chatRouter.js'

const app = express()
const PORT = 8080

//MW
app.use(express.json())
app.use('/static', express.static(__dirname + '/public'))

//conexion DB

mongoose.connect("mongodb+srv://lucianoachille:OLsFUBR67y97XJTR@cluster0.a5s2cfb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB connected"))
    .catch(e => console.log(e))


//ROUTES
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/users', userRouter)

app.listen(PORT, ()=>{
    console.log(`Server escuchando en ${PORT}`)
})

