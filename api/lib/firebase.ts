import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCAiaGTGUtJ5b-Um3nQMiWhmnJWcXP2QOA',
  authDomain: 'ec-qrcode.firebaseapp.com',
  projectId: 'ec-qrcode',
  storageBucket: 'ec-qrcode.firebasestorage.app',
  messagingSenderId: '816022993230',
  appId: '1:816022993230:web:905de107009c079196c61f',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
