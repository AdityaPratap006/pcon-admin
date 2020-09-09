import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCvRpDBkCCpWHIq74vUBGUgjFVzaIzfXwg",
    authDomain: "pcon-web-app.firebaseapp.com",
    databaseURL: "https://pcon-web-app.firebaseio.com",
    projectId: "pcon-web-app",
    storageBucket: "pcon-web-app.appspot.com",
    messagingSenderId: "273625173285",
    appId: "1:273625173285:web:ef80fa3180d23345b41ecc",
    measurementId: "G-F7DRRTNFMN"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const usersCollectionRef = firestore.collection(`users`);
export const interviewsCollectionRef = firestore.collection(`interviews`);

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

export default firebase;