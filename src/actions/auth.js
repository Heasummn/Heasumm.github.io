import { createAction } from 'redux-actions'

export const authRequest = createAction('AUTH_REQUEST')
export const authResponse = createAction('AUTH_RESPONSE')
export const authSignOut = createAction('AUTH_SIGN_OUT');
