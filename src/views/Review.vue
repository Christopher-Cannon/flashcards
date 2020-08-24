<template>
  <div class="panel">
    <h2 class="panel-heading">Reviewing {{ currentDeck }}</h2>

    <div class="margin-v-lg center-text">
      <h3>Front</h3>

      <p>{{ card.front }}</p>

      <div v-if="cardFlipped">
        <hr>

        <h3>Back</h3>

        <p>{{ card.back }}</p>
      </div>
    </div>

    <div class="btn-group" v-if="cardFlipped">
      <a href="javascript:;" class="btn-warning" @click.prevent="failCard()">Fail</a>
      <a href="javascript:;" class="btn-primary" @click.prevent="passCard()">Pass</a>
    </div>

    <a href="javascript:;" class="btn-primary btn-block" v-else @click.prevent="flipCard()">Flip card</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { store } from '../store/store'

export default {
  name: 'review',
  props: ['deckId'],
    data() {
    return {
      card: [],
      cards: [],
      currentDeck: '',
      cardFlipped: false,
      reviewSession: {
        currentReviewId: null,
        failedCards: []
      }
    }
  },
  created() {
    store.dispatch('setDecksRef')
      .then(() => {
        this.getDeckName()
      })

    store.dispatch('setCardsRef')
      .then(() => {
        this.createDeckOfCards()
        this.initReviewSession()
      })
  },
  beforeRouteLeave(to, from, next) {
    // Going to results page and reviews finished - OK to move on
    if (to.name === "Results" && this.reviewSession.currentReviewId === this.cards.length - 1) {
      next()
    // Going anywhere else at anytime - ask user if they are sure
    } else {
      let decision = confirm("Leaving this page will discard your review progress, are you sure?")
  
      if (decision) {
        next()
      } else {
        next(false)
      }
    }
  },
  computed: {
    ...mapGetters({
      currentDeckName: 'currentDeck',
      currentCardsStore: 'getCards'
    })
  },
  methods: {
    async getDeckName() {
      return await store.dispatch('getDeckName', this.deckId).then(() => {
        this.setDeckName()
      })
    },
    setDeckName() {
      this.currentDeck = this.currentDeckName
    },
    flipCard() {
      this.cardFlipped = true
    },
    failCard() {
      this.cardFlipped = false
      
      this.nextReview()
    },
    passCard() {
      this.cardFlipped = false
      
      this.nextReview()
    },
    createDeckOfCards() {
      let newCardSet = []
      
      this.currentCardsStore.forEach(card => {
        if (card.deckId === this.deckId) {
          newCardSet.push(card)
        }
      })

      this.cards = newCardSet
    },
    initReviewSession() {
      // If a cookie exists, load it into state

      // Else, create a new review object, place in state and copy into cookie

      // Go to initial review
      this.nextReview()
    },
    nextReview() {
      if (this.reviewSession.currentReviewId === null) {
        this.reviewSession.currentReviewId = 0
        this.card = this.cards[0]
      } else if (this.reviewSession.currentReviewId < this.cards.length - 1) {
        this.reviewSession.currentReviewId += 1
        this.card = this.cards[this.reviewSession.currentReviewId]
      } else {
        this.$router.push({ name: 'Results' })
      }
    }
  }
}
</script>