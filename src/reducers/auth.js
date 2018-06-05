import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

import { authRequest, authResponse, authSignOut } from '../actions'

const authLoading = handleActions({
  [authRequest]() {
    return true;
  },
  [authResponse]() {
    return false;
  },
  [authSignOut]() {
    return false;
  }
}, false);

const authAuthorized = handleActions({
  [authResponse]: {
    next() {
      return true;
    },
    throw(){
      return false;
    }
  },
  [authSignOut]() {
    return false;
  }
}, false)

const authUser = handleActions({
  [authResponse]: {
    next(state, { payload }) {
      return payload;
    },
    throw() {
      return null;
    }
  },
  [authSignOut]() {
    return null;
  }
}, null)

const authError = handleActions({
  [authResponse]: {
    next() {
      return null;
    },
    throw(state, { payload: { message } }) {
      return message;
    }
  },
  [authSignOut]() {
    return null;
  }
}, null)

const authReducer = combineReducers({
  loading: authLoading,
  isAuthorized: authAuthorized,
  user: authUser,
  error: authError
});

export default authReducer;