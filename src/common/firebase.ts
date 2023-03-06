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
  apiKey: 'AIzaSyD524cf8eNVcs8MfCPBIWw_tP7kLt6odZs',
  authDomain: 'final-project-f5698.firebaseapp.com',
  projectId: 'final-project-f5698',
  storageBucket: 'final-project-f5698.appspot.com',
  messagingSenderId: '162512506291',
  appId: '1:162512506291:web:ef671e9625942528e88fc6',
  measurementId: 'G-H0BY1YHHQE',
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
