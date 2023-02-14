// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD524cf8eNVcs8MfCPBIWw_tP7kLt6odZs',
  authDomain: 'final-project-f5698.firebaseapp.com',
  projectId: 'final-project-f5698',
  storageBucket: 'final-project-f5698.appspot.com',
  messagingSenderId: '162512506291',
  appId: '1:162512506291:web:ef671e9625942528e88fc6',
  measurementId: 'G-H0BY1YHHQE',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const dbService = getFirestore(app);
function getFirestore(app: FirebaseApp) {
  throw new Error('Function not implemented.');
}
