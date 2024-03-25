import indexRouter from "./routes/indexRouter.js"
import express  from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import session from 'express-session'
import MongoStore from "connect-mongo"

const app = express()
const PORT = 8080

//MW
app.use(express.json())
app.use('/', indexRouter)
app.use(cookieParser())
app.use(session({
    secret:"coderSecret",
    resave: true,
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://lucianoachille:zKOF3EYRUfCM1zWi@cluster0.1abfjeq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        //mongoOptions:{userNewUrlParser:true, useUnifiedTopology:true},
        ttl: 100
    }),
    saveUninitialized: true
}))

//conexion DB
mongoose.connect("mongodb+srv://lucianoachille:zKOF3EYRUfCM1zWi@cluster0.1abfjeq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB connected"))
    .catch(e => console.log(e))

//server
    app.listen(PORT, ()=>{
    console.log(`Server escuchando en ${PORT}`)
})

//Routes Cookies
app.get('/setCookie', (req, res) => {
    res.cookie('CookieCookie', 'Esto es una cookie :)', { maxAge: 3000000, signed: true }).send("Cookie creada")
})

app.get('/getCookie', (req, res) => {
    res.send(req.signedCookies)
})

app.get('/deleteCookie', (req, res) => {
    res.clearCookie('CookieCookie').send("Cookie eliminada")
    //res.cookie('CookieCokie', '', { expires: new Date(0) })
})

//Routes session
app.get('/session',(req,res)=>{
    console.log(req.session)
    if(req.session.counter){
        req.session.counter++
        res.send(`Sos el usuario nro ${req.session.counter} en ingresar a la pagina`)
    }else{
        req.session.counter=1
        res.send('sos el 1er usuario en ingresar a la pagina')
    }
})

app.get('/login',(req,res)=>{
    const {email,password} = req.body
    if (email == "admin@admin.com" && password == "1234") {
        req.session.email = email
        req.session.password = password
    }
    console.log(req.session)
    res.send("Login")
})