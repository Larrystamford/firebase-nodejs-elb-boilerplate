const db = require('../firebase-config')
const {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  setDoc,
  doc,
} = require('firebase/firestore')

module.exports = {
  get: async (req, res, next) => {
    const querySnapshot = await getDocs(collection(db, 'users'))
    const list = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    res.send(list)
  },
  post: async (req, res, next) => {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        first: 'test',
        last: 'Lovelace',
        middle: 'waho',
        born: 1815,
      })

      res.send({ id: docRef.id })
    } catch (e) {
      console.error('Error adding document: ', e)
      res.send({ status: 500 })
    }
  },
  update: async (req, res, next) => {
    await setDoc(
      doc(db, 'users', 'wNKcw9PCzh2pPtyWWLtc'),
      {
        first: 'Lee',
        hello: 'ok',
      },
      { merge: true },
    )
    res.send({ msg: 'Updated' })
  },
  delete: async (req, res, next) => {
    await deleteDoc(doc(db, 'users', 'Kj1NHGArIJWUjZSoVUTi'))
    res.send({ msg: 'Deleted' })
  },
}
