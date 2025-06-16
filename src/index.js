const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

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

app.get('/health', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'DB not connected' })
    }
    if (connection) connection.release()
    res.status(200).json({ status: 'ok' })
  })
})



// Middleware pour les routes non trouvées
app.use((req, res) => {
  res.status(404).send('Route not found')
})

const server = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})

module.exports = server
