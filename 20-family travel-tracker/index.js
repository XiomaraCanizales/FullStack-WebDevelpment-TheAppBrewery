// imports
import express from "express"
import bodyParser from "body-parser"
import pg from "pg"

// app
const app = express()
const port = 3000

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

// database
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "admin",
  port: 5432,
})

// db connection
db.connect()

// variables
let currentUserId = 3

// function to fetch visited countries from table
async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM countries_per_user JOIN users ON users.user_id = countries_per_user.user_id WHERE users.user_id = $1",
    [currentUserId]
    )
  let countries = []
  result.rows.forEach((country) => {
    countries.push(country.country_code)
  })
  return countries
}

// fetch country code
async function fetchCountry(country) {
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER (country_name) = $1",
      [country]
    )
    return result.rows[0].country_code
  } catch (err) {
    console.error("Error fetching country:", err)
    return null
  }
}

// fetch users
async function fetchUsers() {
  const result = await db.query("SELECT * FROM users")
  return result.rows
}

// GET home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted()
  const users = await fetchUsers()
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal",
  })
})

app.post('/add', async (req, res) => {
  try {
    const user_input = req.body.country.trim().toLowerCase()
    const country_code = await fetchCountry(user_input)
    const isDuplicate = await db.query(
      "SELECT 1 FROM countries_per_user WHERE country_code = $1",
      [country_code]
    )
    if (isDuplicate.rows.length > 0) {
      console.error("Duplicate country found")
      const countries = await checkVisisted()
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      })
    } else {
      // not duplicate, proceed with insertion
      await db.query(
        "INSERT INTO countries_per_user (country_code) VALUES ($1)",
        [country_code]
      )
      res.redirect("/")
    }
  } catch (err) {
    console.error("Error in POST /add:", err)
    const countries = await checkVisisted()
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    })
  }
 })

app.post("/user", async (req, res) => {
  const user = req.body.user
  const result = await db.query(
    "SELECT * FROM users WHERE (user_id) = $1",
    [user]
  )
  if (result) {
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: "teal",
    })
  }
})

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
