import { takeEvery } from 'redux-saga/effects'
import { authRequest, authSignOut, postsFetchRequest, postFetchRequest, postUpdate, postDelete, postAdd } from '../actions';
import { authenticateUser, logoutUser } from './auth';
import { getPosts, getPost, updatePost, deletePost, addPost } from './posts';

export default function* rootSaga() {
  yield takeEvery(authRequest, authenticateUser);
  yield takeEvery(authSignOut, logoutUser);

  yield takeEvery(postsFetchRequest, getPosts);
  yield takeEvery(postFetchRequest, getPost);

  yield takeEvery(postUpdate, updatePost);
  yield takeEvery(postDelete, deletePost);
  yield takeEvery(postAdd, addPost);
}