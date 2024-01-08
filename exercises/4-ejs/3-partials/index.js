import express from "express"

const app = express()

app.use(express.static('public'))

// routes
app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/about', (req, res) => {
  res.render('about.ejs')
})

app.get('/contact', (req, res) => {
  res.render('contact.ejs')
})

// port
const port = 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
