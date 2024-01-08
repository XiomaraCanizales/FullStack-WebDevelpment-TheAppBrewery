import express from 'express'
import morgan from 'morgan'
import methodOverride from 'method-override'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(morgan('tiny'))
app.use(methodOverride('_method'))

const posts = []

// get all posts
app.get('/', (req, res) => {
    res.render('index.ejs', {posts:posts})
})

// display form to add new post
app.get('/add-post', (req, res) => {
    res.render('post.ejs')
})

// adding new post
app.post('/new-post', (req, res) => {
    const { title, content } = req.body
    const newPost = { title, content }
    posts.push(newPost)
    res.redirect('/')
})

// display form for updating
app.get('/update-post/:title', (req, res) => {
    const post = posts.find(post => post.title === req.params.title)
    if (post) {
        res.render('update-post.ejs', {post})
    } else {
        res.status(404).send('post not found')
    }
})

// updating a post
app.patch('/edit-post', (req, res) => {
    const { title, content } = req.body
    const index = posts.findIndex(post => post.title === title)
    if (index !== -1) {
        posts[index].content = content
        res.redirect('/')
    } else {
        res.status(404).send('post not found')
    } 
})

// delete post
app.get('/delete-post/:title', (req, res) => {
    const index = posts.findIndex(post => post.title === req.params.title)
    console.log(index)
    if (index !== -1) {
      posts.splice(index, 1)
      res.redirect('/')
    } else {
      res.status(404).send('Post not found.')
    }
})

// port
const port = 3000
app.listen(port, () => {
    console.log(`open port ${port}`)
})