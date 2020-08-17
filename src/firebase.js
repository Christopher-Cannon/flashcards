import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { config } from './firebase-credentials'

firebase.initializeApp(config);
const db = firebase.firestore();

export const firebaseAuth = firebase.auth();
export const dbDecks = db.collection('decks');
export const dbCards = db.collection('cards');