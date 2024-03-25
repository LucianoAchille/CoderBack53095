import express from 'express'
import cartRouter from './cartRouter.js'
import productRouter from './productsRouter.js'
import { __dirname } from '../path.js'
import mongoose from 'mongoose'
import userRouter from './userRouter.js'
import chatRouter from './chatRouter.js'

const indexRouter = express.Router()

//ROUTES
indexRouter.use('/public', express.static(__dirname + '/public'))
indexRouter.use('/api/products', productRouter, express.static(__dirname + '/public'))
indexRouter.use('/api/cart', cartRouter)
indexRouter.use('/api/users', userRouter)
indexRouter.use('/api/chat', chatRouter, express.static(__dirname + '/public'))

export default indexRouter