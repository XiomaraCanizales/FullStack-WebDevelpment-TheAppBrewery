// imports
import express from "express"
import bodyParser from "body-parser"
import pg from "pg"
 
// app
const app = express()
const port = 3000
 
// middleware
app.use(bodyParser.urlencoded({ extended:true}))
app.use(express.static("public"))
 
// database
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "admin",
  port: 5432
})
// db conection
db.connect()
 
async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries")
  return result.rows.map(country => country.country_code)
}

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
 
// GET home page
app.get('/', async (req, res) => {
  const countries = await checkVisisted()
  res.render("index.ejs", {countries: countries, total: countries.length})
})
 
// POST new country
app.post('/add', async (req, res) => {
  try {
    const user_input = req.body.country.trim().toLowerCase()
    const country_code = await fetchCountry(user_input)
    const isDuplicate = await db.query(
      "SELECT 1 FROM visited_countries WHERE country_code = $1",
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
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
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
 
// LISTEN
 app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})