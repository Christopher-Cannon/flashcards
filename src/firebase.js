import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { config } from './firebase-credentials'

firebase.initializeApp(config);
export const db = firebase.firestore();
export const firebaseAuth = firebase.auth();