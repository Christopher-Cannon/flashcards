import firebase from 'firebase/app';
import { firebaseAuth } from '../../firebase'
import { dbDecks } from '../../firebase'

const state = {
  currentDeck: ''
}

const getters = {
  currentDeck: state => state.currentDeck
}

const mutations = {
  SET_DECK_NAME: (state, deckName) => {
    deckName === null ? state.currentDeck = null : state.currentDeck = deckName
  }
}

const actions = {
  setDeckName: ({ commit }, deckName) => {
    commit('SET_DECK_NAME', deckName)
  },
  getDeckName: async({ dispatch }, deckId) => {
    let userId = firebaseAuth.currentUser.uid
    let query = dbDecks
      .where("userId", "==", userId)
      .where("id", "==", parseInt(deckId))
    
    await query.get()
      .then(function (querySnapshot) {
        querySnapshot.forEach( function(doc) {
          dispatch('setDeckName', doc.data().name)
        })
    })
  },
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
          if (!querySnapshot.empty) {
            querySnapshot.forEach( function(doc) {
              if (id <= doc.id) {
                id = parseInt(doc.id) + 1
              }
            })
          }
          const newDeck = {
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
      console.log(newDeck)
      await dbDecks.doc(`${newDeck.id}`).set(newDeck)
    } catch (error) {
      console.log(`Error creating new deck, ${error}`)
    }
  },
  // editDeck: async(context, deck) => {
  //   let userId = firebaseAuth.currentUser.uid
  //   let query = dbDecks
  //     .where("userId", "==", userId)
  //     .where("id", "==", parseInt(deckId))
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}