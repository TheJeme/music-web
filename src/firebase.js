import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCOBzkwEZr4fMcrfJnhPtFfU3qSD2tW_d4',
  authDomain: 'jemeapp-subdomains.firebaseapp.com',
  projectId: 'jemeapp-subdomains',
  storageBucket: 'jemeapp-subdomains.firebasestorage.app',
  messagingSenderId: '727753249838',
  appId: '1:727753249838:web:35521bd80ba83267e13bbf',
  measurementId: 'G-K6ZYKCPLTH',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export default app
