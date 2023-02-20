import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC994esSdwrNSAInjZJQcpQyj33o_XIAK8',
  authDomain: 'fir-spa-99485.firebaseapp.com',
  projectId: 'fir-spa-99485',
  storageBucket: 'fir-spa-99485.appspot.com',
  messagingSenderId: '242547028544',
  appId: '1:242547028544:web:f19f869c3cc748c443a5a5',
  // measurementId: 'G-H0BY1YHHQE',
};

const app = initializeApp(firebaseConfig);
const authService = getAuth(app);
const dbService = getFirestore(app);
const storageService = getStorage(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();

export { database, app, authService, dbService, storageService, provider };

// Product Collection
export const productCollection = collection(dbService, 'Product');
