import indexRouter from "./routes/indexRouter"

const app = express()
const PORT = 8080

//MW
app.use(express.json())
app.use('/', indexRouter)

//conexion DB
//mongodb+srv://lucianoachille:zKOF3EYRUfCM1zWi@cluster0.1abfjeq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//mongoose.connect("mongodb+srv://lucianoachille:OLsFUBR67y97XJTR@cluster0.a5s2cfb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
mongoose.connect("mongodb+srv://lucianoachille:zKOF3EYRUfCM1zWi@cluster0.1abfjeq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB connected"))
    .catch(e => console.log(e))

app.listen(PORT, ()=>{
    console.log(`Server escuchando en ${PORT}`)
})
