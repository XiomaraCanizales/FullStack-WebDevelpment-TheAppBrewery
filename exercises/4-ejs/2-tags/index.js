import express from 'express'
const app = express()


app.get('/', (req, res) => {
    const data = {
        title: 'EJS Tags',
        seconds: new Date().getSeconds(),
        items: ['apple', 'banana', 'cherry'],
        htmlContent: '<strong>This is some text</strong>'
    }
    res.render('index.ejs', data)
})

// port
const port = 3000
app.listen(port, () => {
    console.log(`port listening on ${port}`)
})