import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD01Slp2r_I40q-cebWIVy2rN8AUCaBYXY",
    authDomain: "crwn-db-52221.firebaseapp.com",
    databaseURL: "https://crwn-db-52221.firebaseio.com",
    projectId: "crwn-db-52221",
    storageBucket: "crwn-db-52221.appspot.com",
    messagingSenderId: "212001031196",
    appId: "1:212001031196:web:ebd8f49c11dfb22c070bd9",
    measurementId: "G-JWM2ZV8HN8"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }
        catch (error) {
            console.log('error creating user: ', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;