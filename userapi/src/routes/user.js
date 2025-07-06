const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

// GET /user : listing all users
router.get('/', (req, res) => {
  userController.getAll((err, users) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message })
    }
    res.status(200).json(users)
  })
})

// POST /user : create a new user
// Expects a JSON body with username, firstname, and lastname
router.post('/', (req, res) => {
  userController.create(req.body, (err, result) => {
    if (err) {
      return res.status(400).json({ status: 'error', message: err.message })
    }
    res.status(201).json({ status: 'success', result })
  })
})

// GET /user/:username : get a user by username

router.get('/:username', (req, res) => {
  userController.get(req.params.username, (err, user) => {
    if (err) {
      return res.status(404).json({ status: 'error', message: err.message })
    }
    res.status(200).json(user)
  })
})

 // DELETE /user/:username : delete a user by username
router.delete('/:username', (req, res) => {
  userController.delete(req.params.username, (err, result) => {
    if (err) {
      return res.status(404).json({ status: 'error', message: err.message })
    }
    res.status(200).json({ status: 'success', result })
  })
})

module.exports = router
