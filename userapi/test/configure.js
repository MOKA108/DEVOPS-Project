const { expect } = require('chai')
const configure = require('../src/configure')

// Test suite for the configuration module
// This suite tests the configuration loading functionality of the user API service.
// It checks if the default configuration is loaded correctly and if custom configurations can be applied.
// It uses the Chai assertion library for testing.


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
