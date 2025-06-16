const { expect } = require('chai')
let db

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
