const firebase = jest.genMockFromModule('firebase')

const initializeApp = () => {}

const ref = () => ({
  push: () => true,
})

const database = () => ({
  ref,
})

firebase.initializeApp = initializeApp
firebase.database = database

export default firebase
