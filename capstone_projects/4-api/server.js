import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//const apiKey = 'YeTbaalQilKNDcCGvAMIYs4a1Zj9HdNcNbxS2pkm'

app.get('/', (req, res) => {
    res.render('holidays.ejs')
})

app.post('/', async (req, res) => {
    const country = req.body.country
    const year = req.body.year
    const type = req.body.type
    try {
        const options = {
            url: 'https://api.api-ninjas.com/v1/holidays',
            params: {
                country,
                year,
                type
            },
            headers: {
                'X-Api-Key': 'YeTbaalQilKNDcCGvAMIYs4a1Zj9HdNcNbxS2pkm',
            },
        }
        const response = await axios(options)
        /* const sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date)) */
        const sortedData = response.data.sort((a, b) => {
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)
            return dateA - dateB
        }).map(holiday => ({
            ...holiday,
            formattedType: holiday.type.toLowerCase().replace(/_/g, ' ')
        }))
        res.render('holidays.ejs', { data: sortedData })
    } catch (error) {
        console.error('Request failed: ', error)
        res.status(500).send('Internal server error')
    }
})

app.listen(port, () => {
    console.log('port running')
})

/* 
    if (response.status !== 200) {
      res.status(404).send(response.data.message || 'Error fetching holidays');
    } else {
      res.send(response.data); // Send the holiday data back to the client
    }
*/