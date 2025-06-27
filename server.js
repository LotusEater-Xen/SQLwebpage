import express from 'express'
//path and fix path
import path    from 'path'
import { fileURLToPath } from 'url';
import { getThing,  getThings, createThing } from './connector.js'
//fix path 
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


const app = express()
let pagesPath = path.join(__dirname,'pages')
    
app.use(express.urlencoded())

app.get("/",(req, res) =>{ 
   res.sendFile(`${pagesPath}/index.html`)
})

app.get("/things", async(req, res) =>{
    const things = await getThings()
    res.send(things)
})

app.get("/things/:id", async(req, res) =>{
    const id = req.params.id
    const thing = await getThing(id)
    res.send(thing)
})

app.post("/", async(req, res) =>{
    const { title, contents} = req.body
    const thing = await createThing(title, contents)
    res.status(201).send(thing)
})

app.post("/",function(req, res, next){
    res.status(201).send(req.body)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})
