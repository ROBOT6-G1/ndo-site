const firebaseConfig = {
  apiKey: "AIzaSyCikMlADpeQ7RH74RUborBVJ4P81zwAHTE",
  authDomain: "gen-lang-client-0344726942.firebaseapp.com",
  projectId: "gen-lang-client-0344726942",
  storageBucket: "gen-lang-client-0344726942.firebasestorage.app",
  messagingSenderId: "625686759389",
  appId: "1:625686759389:web:bd8d94381a001d850a1834"
};

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = typeof firebase !== 'undefined' ? firebase.firestore() : null;