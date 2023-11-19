import express from 'express'
const app = express()

// body parser middleware
import bodyParser from 'body-parser'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(bodyParser.urlencoded({ extended:true }))

// routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/submit', (req, res) => {
    const street = req.body.street
    const pet = req.body.pet
    res.send(`<h1>Your band name is:</h1><h3>🎸${street+pet}🥁</h3>`)
})

// open port
const port = 3000
app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})