import firebase from 'firebase/compat/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

export type FirebaseAppType = ReturnType<any> & {
  auth: () => ReturnType<typeof getAuth>;
  firestore: () => ReturnType<typeof getFirestore>;
  storage: () => ReturnType<typeof getStorage>;
  database: () => ReturnType<typeof getDatabase>;
};
const firebaseConfig = {
  apiKey: 'AIzaSyBEebcIKABBw1s2vhO27gkHbPh2C-UMoj8',
  authDomain: 'final-test-259bd.firebaseapp.com',
  projectId: 'final-test-259bd',
  storageBucket: 'final-test-259bd.appspot.com',
  messagingSenderId: '95428064758',
  appId: '1:95428064758:web:71aff8da137e1db30e03d7',
  measurementId: 'G-NY89RJEPQ6',
};
const app = firebase.initializeApp(firebaseConfig);
const authService = getAuth(app);
const dbService = getFirestore(app);
const storageService = getStorage(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();

export {
  database,
  app,
  authService,
  dbService,
  storageService,
  provider,
  firebaseConfig,
};

// Product Collection
export const productCollection = collection(dbService, 'Product');
