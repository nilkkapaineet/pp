// riippuvuudet rajapinnalle
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// /pisteet -api
// hakee listan, jossa json-tieto pelaajien id, username, pisteet
const getPisteet = (request, response) => {
  pool.query('SELECT * FROM pisteet', (error, results) => {
    if (error) {
      throw error
    }
    // saadun datan käsittely
    response.status(200).json(results.rows)
    results.rows.forEach(element => {
      console.log(element.username + ': ' + element.pisteet)  
    })
  })
}

const addPisteet = (request, response) => {
  const { username, pisteet } = request.body

  pool.query('INSERT INTO pisteet (username, pisteet) VALUES ($1, $2)', [username, pisteet], error => {
    if (error) {
      throw error
    }
    response.status(201).json({ status: 'success', message: 'user added.' })
  })
}

app
  .route('/pisteet')
  // GET endpoint
  .get(getPisteet)
  // POST endpoint
  .post(addPisteet)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log('Server listening')
})
