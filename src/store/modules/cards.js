import firebase from 'firebase/app';
import { firestoreAction } from 'vuexfire'
import { firebaseAuth } from '../../firebase'
import { db } from '../../firebase'

const state = {
  currentCardData: [],
  dbCards: '',
  cards: []
}

const getters = {
  currentCardData: state => state.currentCardData,
  getCards: state => state.cards
}

const mutations = {
  SET_CARD_DATA: (state, data) => {
    state.currentCardData = data
  },
  SET_DBCARDS_NAME: (state, dbName) => {
    state.dbCards = dbName
  }
}

const actions = {
  setCardsRef: firestoreAction(context => {
    return context.bindFirestoreRef('cards', db.collection(state.dbCards))
  }),
  setCardsDBName: ({ commit }) => {
    let userId = firebaseAuth.currentUser.uid
    commit('SET_DBCARDS_NAME', `cards-${userId}`)
  },
  getCardData: async ({ dispatch }, cardId) => {
    let query = db.collection(state.dbCards)
      .where("id", "==", parseInt(cardId))

    await query.get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const cardData = {
            front: doc.data().front,
            back: doc.data().back
          }
          dispatch('setCardData', cardData)
        })
      })
  },
  setCardData: ({ commit }, cardData) => {
    commit('SET_CARD_DATA', cardData)
  },
  editCard: async ({ dispatch }, card) => {
    let dbRef = db.collection(state.dbCards).doc(`${card.id}`)

    db.runTransaction(function (transaction) {
      return transaction.get(dbRef).then(function (doc) {
        if (!doc.exists) {
          throw "Document does not exist"
        }
        const newCardData = { front: card.front, back: card.back }
        transaction.update(dbRef, newCardData)
        return newCardData
      })
    }).then(function (newCardData) {
      dispatch('setCardData', newCardData)
    })
  },
  buildCard: async ({ dispatch }, card) => {
    try {
      const { serverTimestamp } = firebase.firestore.FieldValue;
      let id = 1

      // Get the next card ID
      await db.collection(state.dbCards).get()
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
  deleteCard: async(context, cardId) => {
    try {
      await db.collection(state.dbCards).doc(`${cardId}`).delete()
    } catch (error) {
      console.log("Error removing card: ", error);
    }
  },
  deleteCardsInDeck: async(context, deckId) => {
    try {
      await db.collection(state.dbCards).get()
        .then((querySnapshot) => {
          let cards = []

          querySnapshot.forEach(function (doc) {
            if (doc.data().deckId == deckId) {
              cards.push(doc.data().id)
            }
          })
          cards.forEach((element) => {
            db.collection(state.dbCards).doc(`${element}`).delete()
          })
        })
    } catch (error) {
      console.log("Error removing card: ", error);
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}