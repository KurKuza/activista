import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/analytics'

firebase.initializeApp({
  apiKey: 'AIzaSyBx7sfqmnWmevbTGDdN345dRpURcK50qNE',
  authDomain: 'activista-5feee.firebaseapp.com',
  projectId: 'activista-5feee',
  storageBucket: 'activista-5feee.appspot.com',
  messagingSenderId: '926953514660',
  appId: '1:926953514660:web:1cd95e98c4a25890206831',
  measurementId: 'G-QKNGSC1Q1Q',
})

export const auth = firebase.auth()
export const firestore = firebase.firestore()
// export const analytics = firebase.analytics()
