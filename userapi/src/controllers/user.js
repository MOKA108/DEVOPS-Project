const db = require('../dbClient')

 // Controller for user operations. This module provides functions to create, retrieve, and delete users in the database.
// It uses a MySQL database connection to perform these operations and handles errors appropriately.

module.exports = {
  create: (user, callback) => {
  if (!user.username || !user.firstname || !user.lastname) {
    return callback(new Error("Wrong user parameters"), null)
  }
  db.query(
    'SELECT username FROM users WHERE username = ?',
    [user.username],
    (err, results) => {
      if (err) return callback(err, null)
      if (results.length > 0) {
        return callback(new Error("User already exists"), null)
      }
      db.query(
        'INSERT INTO users (username, firstname, lastname) VALUES (?, ?, ?)',
        [user.username, user.firstname, user.lastname],
        (err, res) => {
          if (err) return callback(err, null)
          callback(null, 'OK')
        }
      )
    }
  )
},
  getAll: (callback) => {
    db.query(
      'SELECT username, firstname, lastname FROM users',
      (err, results) => {
        if (err) return callback(err, null)
        callback(null, results)
      }
    )
  },

  get: (username, callback) => {
    db.query(
      'SELECT username, firstname, lastname FROM users WHERE username = ?',
      [username],
      (err, results) => {
        if (err) return callback(err, null)
        if (results.length === 0) {
          return callback(new Error("User not found"), null)
        }
        callback(null, results[0])
      }
    )
  },
  delete: (username, callback) => {
  db.query(
    'DELETE FROM users WHERE username = ?',
    [username],
    (err, result) => {
      if (err) return callback(err, null)
      if (result.affectedRows === 0) {
        return callback(new Error("User not found"), null)
      }
      callback(null, 'OK')
    }
  )
  }
} 
