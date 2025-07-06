const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')

chai.use(chaiHttp)

// Test suite for the User REST API
// This suite tests the user creation, retrieval, and deletion functionalities of the user API service.
// It checks if users can be created, retrieved by username, and deleted correctly.
// The tests ensure that the API behaves as expected, returning appropriate status codes and messages.

describe('User REST API', () => {
// Before running the tests, we need to ensure that the database is clean
// This is done by deleting all existing users in the 'users' table.
  beforeEach((done) => {
  
    db.query('DELETE FROM users', done)
  })

  after((done) => {
    app.close(() => {
      db.end(done)
    })
  })

  describe('POST /user', () => {
// This endpoint is used to create a new user.
// It expects a JSON object with 'username', 'firstname', and 'lastname' fields.  
    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .end((err, res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
    })

    it('pass wrong parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .end((err, res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
    })
    it('should not create a user if username already exists', (done) => {
  const user = {
    username: 'alice',
    firstname: 'Alice',
    lastname: 'Liddell'
  }

  chai.request(app)
    .post('/user')
    .send(user)
    .end(() => {
      chai.request(app)
        .post('/user')
        .send(user)
        .end((err, res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res.body.message).to.match(/already exists/i)
          done()
        })
    })
})
  })


  describe('GET /user/:username', () => {             // This endpoint retrieves a user by their username.
                                                      // It returns the user's details if found, or an error if the user does not exist.  
    it('should get a user by username', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
  
      db.query(
        'INSERT INTO users (username, firstname, lastname) VALUES (?, ?, ?)',
        [user.username, user.firstname, user.lastname],
        () => {
          chai.request(app)
            .get('/user/sergkudinov')
            .end((err, res) => {
              chai.expect(res).to.have.status(200)
              chai.expect(res.body.username).to.equal('sergkudinov')
              done()
            })
        }
      )
    })
  })

  it('should not create a user without firstname or lastname', (done) => {
  const user = {
    username: 'jdoe'
   
  }
  chai.request(app)
    .post('/user')
    .send(user)
    .end((err, res) => {
      chai.expect(res).to.have.status(400)
      chai.expect(res.body.status).to.equal('error')
      done()
    })
})
  it('should delete an existing user', (done) => {
  const user = {
    username: 'jdoe',
    firstname: 'John',
    lastname: 'Doe'
  }

  chai.request(app)
    .post('/user')
    .send(user)
    .end(() => {
   
      chai.request(app)
        .delete('/user/jdoe')
        .end((err, res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          done()
        })
    })
})
})
