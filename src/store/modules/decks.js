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
      const { serverTimestamp } = firebase.firestore.FieldValue;
      let userId = firebaseAuth.currentUser.uid
      let query = dbDecks.where("userId", "==", userId)
      let id = 1
      
      // Get the ID of the deck we just added
      let deckId = await query.get()
        .then((querySnapshot) => {
          // Determine next ID number to use for deck
          if (querySnapshot.docs.length > 0) {
            id = querySnapshot.docs.length + 1
          }
          let newDeck = {
            id: id,
            userId: userId,
            name: deckName,
            created: serverTimestamp()
          }
          dispatch('addDeck', newDeck)
          return id
        })

      return deckId
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