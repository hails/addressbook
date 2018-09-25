const { getConfig } = require('./')

const apiKey = process.env.FIREBASE_API_KEY
const authDomain = process.env.FIREBASE_AUTH_DOMAIN
const databaseURL = process.env.FIREBASE_DATABASE_URL
const projectId = process.env.FIREBASE_PROJECT_ID
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET
const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID

const config = {
  development: {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
  },
  production: {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
  },
  test: {
    apiKey: 'some-api-key',
    authDomain: 'some-auth-domain',
    databaseURL: 'some-database-url',
    projectId: 'some-project-id',
    storageBucket: 'some-storage-bucket',
    messagingSenderId: 'some-messaging-sender-id',
  },
}

module.exports = getConfig(config)
