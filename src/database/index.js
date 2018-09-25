const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')
const Sequelize = require('sequelize')

const getConfig = require('../config/database')

const fsPromise = Promise.promisifyAll(fs)
const db = {
  Sequelize,
}

const {
  host,
  dialect,
  database,
  username,
  password,
  logging,
  port,
} = getConfig

const sequelize = new Sequelize(
  database,
  username,
  password,
  {
    host,
    port,
    dialect,
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    logging,
  }
)
db.sequelize = sequelize

const readModelFiles = () =>
  fsPromise.readdirAsync(path.join(__dirname, 'models'))
    .filter(file => (file !== 'index.js') && (file.slice(-3) === '.js'))
    .map((file) => {
      const model = sequelize.import(path.join(__dirname, 'models/', file))

      db[model.name] = model

      return model
    })
    .each((model) => {
      if (model.associate) {
        model.associate(db)
      }
    })
    .catch((err) => {
      console.error('Error reading model files')
      throw err
    })

const bootstrap = () => {
  console.info('Starting database bootstrap')
  return readModelFiles()
    .then(() => {
      console.info('Attempting database authentication')
      return db.sequelize.authenticate()
    })
    .then(() => {
      console.info('Authentication successful')
    })
    .catch((err) => {
      console.error('Error bootstraping application')
      throw err
    })
}
db.bootstrap = bootstrap

module.exports = db
