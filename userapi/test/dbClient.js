const { expect } = require('chai')
let db

// Test suite for the database client
// This suite tests the database connection functionality of the user API service.
// It checks if the MySQL database can be connected to successfully.
// The tests ensure that the database client behaves as expected, allowing for user operations to be performed.

describe('Database Client', () => {
  it('should be defined', () => {
    expect(db).to.exist
  })

  it('should have a getConnection method', () => {
    expect(db.getConnection).to.be.a('function')
  })
})
describe('MySQL', () => {
  before(() => {
    db = require('../src/dbClient')
  })

  it('should connect to MySQL', (done) => {
    db.getConnection((err, connection) => {
      expect(err).to.be.null
      expect(connection).to.exist
      if (connection) connection.release()
      done()
    })
  })
})
