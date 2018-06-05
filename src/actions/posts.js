import { createAction } from 'redux-actions'

export const postsFetchRequest = createAction('POSTS_FETCH_REQUEST')
export const postsFetchResponse = createAction('POSTS_FETCH_RESPONSE')

export const postFetchRequest = createAction('POST_FETCH_REQUEST')
export const postFetchResponse = createAction('POST_FETCH_RESPONSE')
export const postUpdate = createAction('POST_UPDATE')
export const postDelete = createAction('POST_DELETE')
export const postAdd = createAction('POST_ADD')