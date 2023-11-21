import express from 'express'
const app = express()

app.use(express.static('views'))

// middleware
let day = null
function getDay(req, res, next) {
    const currentDay = new Date()
    day = currentDay.getDay()
    next()
}
app.use(getDay)

// routes
app.get('/', (req, res) => {
    res.render('index.ejs', {day})
})

// port
const port = 3000
app.listen(port, () => {
    console.log(`port listening on ${port}`)
})