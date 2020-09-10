import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCvRpDBkCCpWHIq74vUBGUgjFVzaIzfXwg",
    authDomain: "pcon-web-app.firebaseapp.com",
    databaseURL: "https://pcon-web-app.firebaseio.com",
    projectId: "pcon-web-app",
    storageBucket: "pcon-web-app.appspot.com",
    messagingSenderId: "273625173285",
    appId: "1:273625173285:web:b4c7f957baf786aeb41ecc",
    measurementId: "G-B3BBQQ35Y3"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();
export const realTimeDB = firebase.database();

export const usersCollectionRef = firestore.collection(`users`);
export const interviewsCollectionRef = firestore.collection(`interviews`);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ 'prompt': 'select_account' });
export const signInWithGoogle = () => firebaseAuth.signInWithPopup(provider);

export const updateUserProfileDocument = async (userId, data) => {

    const userRef = usersCollectionRef.doc(userId);
    try {
        await userRef.update({
            ...data,
        });
    } catch (error) {
        throw error;
    }
}

export const getInterviewDocument = async (interviewId) => {
    const interviewRef = interviewsCollectionRef.doc(interviewId);

    let interviewData = null;
    try {
        const snapshot = await interviewRef.get();
        interviewData = snapshot.data();
    } catch (error) {
        throw error;
    }

    return interviewData;
}

export const updateInterviewDocument = async (interviewId, data) => {
    const interviewRef = interviewsCollectionRef.doc(interviewId);
    try {
        await interviewRef.update({
            ...data,
        });
    } catch (error) {
        throw error;
    }
}

export const deleteInterviewDocument = async (interviewId) => {
    const interviewRef = interviewsCollectionRef.doc(interviewId);
    try {
        await interviewRef.delete();
    } catch (error) {
        throw error;
    }
}


export const alumniRef = realTimeDB.ref().child('alumni');

export default firebase;