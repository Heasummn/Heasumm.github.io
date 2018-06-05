import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

import { postsFetchRequest, postsFetchResponse, postDelete } from '../actions'
import { postFetchRequest, postFetchResponse } from '../actions';

// These two reducers are literally the exact same, but they go in different places
// TODO: find a way to remove this boilerplate
const postsLoading = handleActions({
  [postsFetchRequest]() {
    return true;
  },
  [postsFetchResponse]() {
    return false;
  }
}, false);

const postsValue = handleActions({
  [postsFetchResponse]: {
    next(state, { payload }) {
      return payload;
    }
  }
}, []);

const postsError = handleActions({
  [postsFetchResponse]: {
    next() {
      return null;
    },
    throw(state, { payload: { message } }) {
      return message;
    }
  }
}, null)

export const postsReducer = combineReducers({
  loading: postsLoading,
  data: postsValue,
  error: postsError
})


const postLoading = handleActions({
  [postFetchRequest]() {
    return true;
  },
  [postFetchResponse]() {
    return false;
  }
}, false)

const postValue = handleActions({
  [postFetchResponse]: {
    next(state, { payload }) {
      return payload;
    }
  },
  [postDelete]() {
    return null;
  }
}, null);

const postError = handleActions({
  [postFetchResponse]: {
    next() {
      return null;
    },
    throw(state, { payload: { message } }) {
      return message;
    }
  }
}, null)

export const postReducer = combineReducers({
  loading: postLoading,
  data: postValue,
  error: postError
})