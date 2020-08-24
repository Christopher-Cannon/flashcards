import { store } from './store/store'
import Home from './views/Home';
import Login from './views/Login';
import Decks from './views/Decks';
import Review from './views/Review';
import Results from './views/Results';

const About = () => import('./views/About');
const Settings = () => import('./views/Settings');
const Register = () => import('./views/Register');
const PasswordReset = () => import('./views/PasswordReset');
const DeckView = () => import(/* webpackChunkName: "deck-editor" */ './views/DeckView');
const Card = () => import(/* webpackChunkName: "deck-editor" */ './views/Card');

export const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/password-reset', name: 'PasswordReset', component: PasswordReset },
  { path: '/results', name: 'Results', component: Results },
  { path: '/decks', name: 'Decks', component: Decks },
  { path: '/deck/add', name: 'DeckAdd', component: DeckView },
  { 
    path: '/deck/:deckId', 
    name: 'DeckView', 
    component: DeckView, 
    props: true, 
    async beforeEnter(to, from, next) {
      store.dispatch('setDecksDBName')
      await store.dispatch('setDecksRef')
      .then(() => {
        let decks = store.getters['getDecks']
        let match = false
        
        decks.forEach(elem => {
          if (to.params.deckId == elem.id) {
            match = true
          }
        })
        match ? next() : next({ name: 'Decks' })
      })
      .catch(error => {
        console.log(`Error accessing decks, ${error}`)
        next({ name: 'Decks' })
      })
    }
  },
  { path: '/deck/:deckId/card', redirect: { name: 'DeckView' } },
  { path: '/deck/:deckId/card/add', name: 'CardAdd', component: Card, props: true },
  { 
    path: '/deck/:deckId/card/:cardId', 
    name: 'CardView', 
    component: Card, 
    props: true, 
    async beforeEnter(to, from, next) {
      store.dispatch('setCardsDBName')
      await store.dispatch('setCardsRef')
      .then(() => {
        let cards = store.getters['getCards']
        let match = false
        
        cards.forEach(elem => {
          if (to.params.cardId == elem.id) {
            match = true
          }
        })
        match ? next() : next({ name: 'DeckView', params: { deckId: (to.params.deckId) } })
      })
      .catch(error => {
        console.log(`Error accessing cards, ${error}`)
        next({ name: 'DeckView', params: { deckId: to.params.deckId } })
      })
    }
  },
  { path: '/deck/:deckId/review', name: 'Review', component: Review, props: true },
  { path: '*', redirect: { name: 'Home' } },
]