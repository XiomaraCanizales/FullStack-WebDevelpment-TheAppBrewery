import express from "express"
import axios from "axios"

const app = express()
const port = 3000
const API_URL = "https://secrets-api.appbrewery.com"

//TODO 1: Fill in your values for the 3 types of auth.
/* const yourUsername = "xiokat"
const yourPassword = "Rxne1987"
const yourAPIKey = "53c4c42d-32ea-4b7b-a64f-34ed2e3f7eaf"
const yourBearerToken = "fb08f7b9-8903-4b50-b01a-c83d9655d66f" */

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." })
})

//TODO 2: Use axios to hit up the /random endpoint
app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random")
    res.render("index.ejs", { content: JSON.stringify(result.data) })
  } catch (error) {
    res.status(404).send(error.message)
  }
})

//TODO 3: Write your code here to hit up the /all endpoint
//Specify that you only want the secrets from page 2
app.get("/basicAuth", async (req, res) => {
    try {
      const result = await axios.get((API_URL + "/all?page=2"), {
        auth: {
          username: yourUsername,
          password: yourPassword
        }
      })
      res.render("index.ejs", { content: JSON.stringify(result.data) })
    } catch (error) {
      res.status(404).send(error.message)
    }
})

  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/filter?score=7&apiKey=" + yourAPIKey)
    res.render("index.ejs", { content: JSON.stringify(result.data) })
  } catch (error) {
    res.status(404).send(error.message)
  }
});

//TODO 5: Write your code here to hit up the /secrets/{id} endpoint
//and get the secret with id of 42
app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get((API_URL + "/secrets/42"), {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`
      }
    })
    res.render("index.ejs", { content: JSON.stringify(result.data) })
  } catch (error) {
    res.status(404).send(error.message)
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
