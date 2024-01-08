import express, { urlencoded } from 'express'
const app = express()

// custom middleware
function logger(req, res, next) {
    console.log('request method: ', req.method)
    console.log('request url: ', req.url)
    next()
}

app.use(logger)

// route
app.get('/', (req, res) => {
    res.send('hello')
})

// open port
const port = 3000
app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})