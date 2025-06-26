import express from 'express'

import { getThing,  getThings, createThing } from './connector.js'

const app = express()

app.use(express.json())

app.get("/things", async(req, res) =>{
    const things = await getThings()
    res.send(things)
})

app.get("/things/:id", async(req, res) =>{
    const id = req.params.id
    const thing = await getThing(id)
    res.send(thing)
})

app.post("/things", async(req, res) =>{
    const { title, contents} = req.body
    const note = await createThing(title, contents)
    res.status(201).send(note)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})
