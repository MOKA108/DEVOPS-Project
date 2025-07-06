const chai = require('chai')
const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

// Test suite for the user controller
// This suite tests the user creation, retrieval, and deletion functionalities of the user API service. 
// It checks if users can be created, retrieved by username, and deleted correctly.


describe('User', () => {
  beforeEach((done) => {
    db.query('DELETE FROM users', done)
  })

  describe('Create', () => {
    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        db.query('SELECT * FROM users WHERE username = ?', [user.username], (err, results) => {
          expect(results).to.have.lengthOf(1)
          expect(results[0].firstname).to.equal('Sergei')
          done()
        })
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoid creating an existing user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, () => {
        userController.create(user, (err, result) => {
          expect(err).to.not.be.equal(null)
          expect(result).to.be.equal(null)
          done()
        })
      })
    })

    it('should return an error when getting a user that does not exist', (done) => {
  userController.get('unknownuser', (err, result) => {
    expect(err).to.not.be.null
    expect(result).to.be.null
    expect(err.message).to.match(/not found/i)
    done()
  })
})

  describe('Get', () => {
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
            userController.get(user.username, (err, result) => {
              expect(err).to.be.null
              expect(result).to.include({
                username: 'sergkudinov',
                firstname: 'Sergei',
                lastname: 'Kudinov'
              })
              done()
            })
          }
        )
      })
    })
  })
})
