import Home from './views/Home';
import About from './views/About';
import Settings from './views/Settings';
import Login from './views/Login';
import Register from './views/Register';
import Decks from './views/Decks';
import DeckView from './views/DeckView';
import Review from './views/Review';
import Results from './views/Results';
import PasswordReset from './views/PasswordReset';
import Card from './views/Card';

export const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/decks', name: 'Decks', component: Decks },
  { path: '/deck-view', name: 'DeckView', component: DeckView },
  { path: '/review', name: 'Review', component: Review },
  { path: '/results', name: 'Results', component: Results },
  { path: '/password-reset', name: 'PasswordReset', component: PasswordReset },
  { path: '/card', name: 'Card', component: Card },
]

// Proposal: rename 'deck-view' to just 'decks'

// /decks             -> View all of user's decks
// /deck-view/4       -> View deck 4
// /deck-view/add     -> Add
// /deck-view/4/card/add    -> Add card to deck 4
// /deck-view/4/card/17     -> Edit card 17 in deck 4

// /review
// /review/results