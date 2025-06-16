const { expect } = require('chai')
const configure = require('../src/configure')

describe('Configure', () => {
  it('load default json configuration file', () => {
    const config = configure()
    expect(config.mysql).to.eql({
      host: "localhost",
      user: "root",
      password: "449217",
      database: "lab",
      port: 3306,
    })
  })
  it('load custom configuration', () => {
    const config_custom = { custom: "value" }
    const config = configure(config_custom)
    expect(config).to.include.keys('mysql')
    expect(config.custom).to.equal("value")
  })
})
