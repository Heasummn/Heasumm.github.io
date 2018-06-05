import { combineReducers } from 'redux'

import authReducer from './auth'
import { postsReducer, postReducer } from './posts'

const reducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  currentPost: postReducer
})

export default reducer;