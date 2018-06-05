import { db, Timestamp } from '../firebase'
import { put } from 'redux-saga/effects';
import { postsFetchResponse, postFetchResponse } from '../actions';

export function* getPosts() {
  try {
    let posts = [];
    yield db.collection("posts").get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        if(doc.exists) {
          posts.push({
            id: doc.id,
            ...doc.data()
          })
        }
      })
    });
    yield put(postsFetchResponse(posts));
  } catch(error) {
    yield put(postsFetchResponse(new Error(error)));
  }
}

export function* getPost(action) {
    let slug = action.payload;
    const post = yield db.collection("posts").where('slug', '==', slug).get().then(querySnapshot => {
      if(querySnapshot.empty) {
        return new Error('This Blog Post does not exist!')
      }
      return querySnapshot.docs[0].data();
    })

    yield put(postFetchResponse(post));
}

export function* updatePost(action) {
  let {title, slug, body, intro, description, initialSlug} = action.payload;

  // Update the document with the initial Slug, there should only be one so we only update the first, this is user enforced
  yield db.collection("posts").where('slug', '==', initialSlug).get().then((querySnapshot) => {
    querySnapshot.docs[0].ref.set({
      title, description, slug, body, intro
    });
  });
}

export function* deletePost(action) {
  let slug = action.payload;
  yield db.collection("posts").where('slug', '==', slug).get().then((querySnapshot) => {
    querySnapshot.docs[0].ref.delete()
  });
}

export function* addPost(action) {
  let {title, description, slug, intro, body} = action.payload;
  yield db.collection("posts").add({
    title, description, slug, body, intro,
    date: Timestamp.fromDate(new Date())
  });
}