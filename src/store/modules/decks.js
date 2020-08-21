import firebase from 'firebase/app';
import { firestoreAction } from 'vuexfire'
import { firebaseAuth } from '../../firebase'
import { db } from '../../firebase'

const state = {
  currentDeck: '',
  dbDecks: '',
  decks: []
}

const getters = {
  currentDeck: state => state.currentDeck,
  getDecks: state => state.decks
}

const mutations = {
  SET_DECK_NAME: (state, deckName) => {
    deckName === null ? state.currentDeck = null : state.currentDeck = deckName
  },
  SET_DBDECKS_NAME: (state, dbName) => {
    state.dbDecks = dbName
  }
}

const actions = {
  setDecksRef: firestoreAction(context => {
    return context.bindFirestoreRef('decks', db.collection(state.dbDecks))
  }),
  setDecksDBName: ({ commit }) => {
    let userId = firebaseAuth.currentUser.uid
    commit('SET_DBDECKS_NAME', `decks-${userId}`)
  },
  getDeckName: async({ dispatch }, deckId) => {
    let query = db.collection(state.dbDecks)
    .where("id", "==", parseInt(deckId))
    
    await query.get()
    .then(function (querySnapshot) {
      querySnapshot.forEach( function(doc) {
        dispatch('setDeckName', doc.data().name)
      })
    })
  },
  setDeckName: ({ commit }, deckName) => {
    commit('SET_DECK_NAME', deckName)
  },
  buildDeck: async({ dispatch }, deckName) => {
    try {
      const { serverTimestamp } = firebase.firestore.FieldValue;
      let id = 1
      
      // Get the ID of the deck we just added
      let deckId = await db.collection(state.dbDecks).get()
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
      await db.collection(state.dbDecks).doc(`${newDeck.id}`).set(newDeck)
    } catch (error) {
      console.log(`Error creating new deck, ${error}`)
    }
  },
  editDeck: async({ dispatch }, deck) => {
    let dbRef = db.collection(state.dbDecks).doc(`${deck.id}`)

    db.runTransaction( function(transaction) {
      return transaction.get(dbRef).then( function(doc) {
        if (!doc.exists) {
          throw "Document does not exist"
        }
        transaction.update(dbRef, { name: deck.deckName })
        return deck.deckName
      })
    }).then( function(deckName) {
      dispatch('setDeckName', deckName)
    })
  },
  deleteDeck: async(context, deckId) => {
    try {
      await db.collection(state.dbDecks).doc(`${deckId}`).delete()
    } catch (error) {
      console.log("Error removing deck: ", error);
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}