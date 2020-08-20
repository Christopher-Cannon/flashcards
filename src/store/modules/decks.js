import firebase from 'firebase/app';
import { firestoreAction } from 'vuexfire'
import { firebaseAuth } from '../../firebase'
import { db } from '../../firebase'

const state = {
  currentDeck: '',
  dbDecks: '',
  dbCards: '',
  decks: [],
  cards: []
}

const getters = {
  currentDeck: state => state.currentDeck,
  getDecks: state => state.decks,
  getCards: state => state.cards
}

const mutations = {
  SET_DECK_NAME: (state, deckName) => {
    deckName === null ? state.currentDeck = null : state.currentDeck = deckName
  },
  SET_DBDECKS_NAME: (state, dbName) => {
    state.dbDecks = dbName
  },
  SET_DBCARDS_NAME: (state, dbName) => {
    state.dbCards = dbName
  }
}

const actions = {
  setDecksRef: firestoreAction(context => {
    return context.bindFirestoreRef('decks', db.collection(state.dbDecks))
  }),
  setCardsRef: firestoreAction(context => {
    return context.bindFirestoreRef('cards', db.collection(state.dbCards))
  }),
  // Unsure about this
  setDecksDBName: ({ commit }) => {
    let userId = firebaseAuth.currentUser.uid
    commit('SET_DBDECKS_NAME', `decks-${userId}`)
  },
  setCardsDBName: ({ commit }) => {
    let userId = firebaseAuth.currentUser.uid
    commit('SET_DBCARDS_NAME', `cards-${userId}`)
  },
  setDeckName: ({ commit }, deckName) => {
    commit('SET_DECK_NAME', deckName)
  },
  getDeckName: async({ dispatch }, deckId) => {
    let userId = firebaseAuth.currentUser.uid
    let query = db.collection(state.dbDecks)
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
      let query = db.collection(state.dbDecks)
        .where("userId", "==", userId)
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
  buildCard: async({ dispatch }, card) => {
    try {
      const { serverTimestamp } = firebase.firestore.FieldValue;
      let userId = firebaseAuth.currentUser.uid
      let query = db.collection(state.dbCards)
        .where("userId", "==", userId)
      let id = 1

      // Get the next card ID
      await query.get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(function (doc) {
              // Find the highest current ID and add 1
              if (id <= doc.id) {
                id = parseInt(doc.id) + 1
              }
            })
          }
          const newCard = {
            id: id,
            userId: userId,
            deckId: card.deckId,
            front: card.front,
            back: card.back,
            created: serverTimestamp()
          }
          dispatch('addCard', newCard)
        })

      return card.deckId
    } catch (error) {
      console.log(`Error building new deck, ${error}`)
    }
  },
  addCard: async (context, newCard) => {
    try {
      await db.collection(state.dbCards).doc(`${newCard.id}`).set(newCard)
    } catch (error) {
      console.log(`Error creating new deck, ${error}`)
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}