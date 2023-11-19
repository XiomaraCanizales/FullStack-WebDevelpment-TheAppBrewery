import express from 'express'
const app = express()

// body parser middleware
import bodyParser from 'body-parser'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(bodyParser.urlencoded({ extended:true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})
app.post('/submit', (req, res) => {
    console.log(req.body)
})

// open port
const port = 3000
app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})