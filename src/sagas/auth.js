import {auth} from '../firebase'
import { put } from 'redux-saga/effects';
import { authResponse } from '../actions';

export function* authenticateUser(action) {
  let {email, password} = action.payload;
  try {
    const authObject = yield auth.signInWithEmailAndPassword(email, password);
    yield put(authResponse(authObject.user));
    
  } catch(error) {
    yield put(authResponse(new Error(error)))
  }
}

export function* logoutUser(action) {
  yield auth.signOut();
}