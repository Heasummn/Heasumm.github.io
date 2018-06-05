import firebase from 'firebase/app';
import 'firebase/auth'
import { authResponse } from '../actions';
import { store } from '..';

const config = {
  apiKey: "AIzaSyCdozh9FIKsu-ACffrquxmzP67tYnCUdtM",
  authDomain: "blog-11436.firebaseapp.com",
  databaseURL: "https://blog-11436.firebaseio.com",
  projectId: "blog-11436",
  storageBucket: "blog-11436.appspot.com",
  messagingSenderId: "983741307800",
  timestampsInSnapshots: true
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

auth.onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch(authResponse(user))
  }
});

export {
  auth
};
