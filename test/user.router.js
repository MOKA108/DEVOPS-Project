const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')

chai.use(chaiHttp)

describe('User REST API', () => {

  beforeEach((done) => {
    // Clean DB before each test
    db.query('DELETE FROM users', done)
  })

  after((done) => {
    app.close(() => {
      db.end(done)
    })
  })

  describe('POST /user', () => {

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
  // Crée d'abord l'utilisateur
  chai.request(app)
    .post('/user')
    .send(user)
    .end(() => {
      // Tente de le recréer
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

  // Exemple de test GET
  describe('GET /user/:username', () => {
    it('should get a user by username', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      // Crée d'abord l'utilisateur
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
    // firstname et lastname manquants
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
  // Crée d'abord l'utilisateur
  chai.request(app)
    .post('/user')
    .send(user)
    .end(() => {
      // Supprime l'utilisateur
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
