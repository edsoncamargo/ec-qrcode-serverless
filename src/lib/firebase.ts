import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDG8nBw4QyF8xKEsntqgcCJO-i-ufHSQm8',
  authDomain: 'ec-our-time-together-web.firebaseapp.com',
  projectId: 'ec-our-time-together-web',
  storageBucket: 'ec-our-time-together-web.firebasestorage.app',
  messagingSenderId: '728223056069',
  appId: '1:728223056069:web:d4e3527a21daf2e7cdf0ac',
  measurementId: 'G-54WGM5H39E',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
