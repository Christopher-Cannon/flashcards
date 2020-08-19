import firebase from 'firebase/app';
import { firebaseAuth } from '../../firebase'
import { dbDecks } from '../../firebase'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
  buildDeck: async({ dispatch }, deckName) => {
    try {
      // Determine next ID number to use for deck
      const { serverTimestamp } = firebase.firestore.FieldValue;
      let userId = firebaseAuth.currentUser.uid
      let query = dbDecks.where("userId", "==", userId)
      let id = 1
      
      let newDeck = query.get()
        .then((querySnapshot) => {
          if (querySnapshot.docs.length > 0) {
            id = querySnapshot.docs.length + 1
          }
          newDeck = {
            id: id,
            userId: userId,
            name: deckName,
            created: serverTimestamp()
          }
          return newDeck
        })
        .then(() => dispatch('addDeck', newDeck))
    } catch (error) {
      console.log(`Error building new deck, ${error}`)
    }
  },
  addDeck: async(context, newDeck) => {
    try {
      await dbDecks.add(newDeck)
    } catch (error) {
      console.log(`Error creating new deck, ${error}`)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}