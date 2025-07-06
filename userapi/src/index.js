
const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000


 // Configure the application with custom or default settings

const db = require('./dbClient')
db.on && db.on("error", (err) => {
  console.error(err)
})


app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use('/user', userRouter)

app.get('/', (req, res) => res.send('Hello World!'))

// Health check endpoint to verify if the database connection is active
// This endpoint checks the database connection and returns a status of 'ok' if the connection is successful.
// If the connection fails, it returns a status of 'error' with a message indicating that the database is not connected.
// This is useful for monitoring the health of the service and ensuring that the database is reachable. 
app.get('/health', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'DB not connected' })
    }
    if (connection) connection.release()
    res.status(200).json({ status: 'ok' })
  })
})



// Middleware for handling 404 errors
// This middleware catches all requests that do not match any defined routes and returns a 404 status.

app.use((req, res) => {
  res.status(404).send('Route not found')
})

const server = app.listen(port, '0.0.0.0', (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})

module.exports = server
