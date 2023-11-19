import express from 'express'
const app = express()

// morgan middleware
import morgan from 'morgan'
app.use(morgan('tinny'))

app.get('/', (req, res) => {
    res.send('hello')
})

// open port
const port = 3000
app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})