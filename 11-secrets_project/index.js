import express from 'express'
//import bodyParser from 'body-parser'

const app = express()

import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

//app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.urlencoded({ extended:true }))

// middleware
let userIsAuthorised = false
function passwordCheck(req, res, next) {
    const password = req.body.password
    if (password === 'ILoveProgramming') {
       userIsAuthorised = true
    }
    next()
}
app.use(passwordCheck)

// routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/check', (req, res) => {
    if (userIsAuthorised) {
        res.sendFile(__dirname + '/public/secret.html')
    } else {
        res.redirect('/')
    }
})

// port
const port = 3000
app.listen(port, () => {
    console.log(`port running on ${port}`)
})