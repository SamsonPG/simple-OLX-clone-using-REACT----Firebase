import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAUWLXGZ4Y5VcTwgwTvxwL1DH2knWlrInc",
  authDomain: "olx-clone-10707.firebaseapp.com",
  projectId: "olx-clone-10707",
  storageBucket: "olx-clone-10707.appspot.com",
  messagingSenderId: "456940648300",
  appId: "1:456940648300:web:c63de967a964795a8ce549"
};
 

export default  firebase.initializeApp(firebaseConfig)