import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyDJ2W2fKuumpI6-jHA673BdG3HiCe8Uvlc",
    authDomain: "crwn-db-a1322.firebaseapp.com",
    projectId: "crwn-db-a1322",
    storageBucket: "crwn-db-a1322.appspot.com",
    messagingSenderId: "785606838580",
    appId: "1:785606838580:web:7dbaf7db3f9f6d6ce03d61"
  };

  firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists){
      const { displayName, email} = userAuth;
      const createdAt = new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error){
        console.log('error creating user', error.message);
      }

    }
    return userRef;
  };

  export default firebase;
