import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
  apiKey: 'AIzaSyDHHh_HUcTilJ6G9bWpfsoZC59BSiNDrI4',
  authDomain: 'final-project-efd12.firebaseapp.com',
  projectId: 'final-project-efd12',
  storageBucket: 'final-project-efd12.appspot.com',
  messagingSenderId: '836878321834',
  appId: '1:836878321834:web:70e916cfcc78a662ae68d3',
  measurementId: 'G-869N0Y1MDG',
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
