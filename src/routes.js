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
  { path: '/deck/add', name: 'DeckAdd', component: DeckView },
  { path: '/deck/:deckId', name: 'DeckView', component: DeckView, props: true },
  { path: '/review', name: 'Review', component: Review },
  { path: '/results', name: 'Results', component: Results },
  { path: '/password-reset', name: 'PasswordReset', component: PasswordReset },
  { path: '/deck/:deckId/card', redirect: { name: 'DeckView' } },
  { path: '/deck/:deckId/card/add', name: 'CardAdd', component: Card, props: true },
  { path: '/deck/:deckId/card/:cardId', name: 'CardView', component: Card, props: true },
  { path: '*', redirect: { name: 'Home' } },
]