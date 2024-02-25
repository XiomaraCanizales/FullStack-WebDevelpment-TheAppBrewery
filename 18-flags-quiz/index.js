import express from "express"
import bodyParser from "body-parser"
import pg from "pg"

// app
const app = express();
const port = 3000;

// variables
let totalCorrect = 0
let currentQuestion = {}
let quiz = []

// database
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "admin",
  port: 5432
})
db.connect()

db.query("SELECT * FROM flags", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack)
  } else {
    quiz = res.rows
  }
  db.end()
})

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0
  nextQuestion()
  console.log(currentQuestion)
  res.render("index.ejs", { question: currentQuestion })
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim()
  let isCorrect = false
  if (currentQuestion.name.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++
    isCorrect = true
  }

  nextQuestion()
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  })
})

function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)]
  currentQuestion = randomCountry
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})