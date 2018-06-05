import { connect } from 'react-redux'

import { authSignOut } from "../actions";

import withRouter from "react-router-dom/withRouter";
import * as routes from '../routes'

const LogOut = withRouter(({isAuthed, history, logout}) => {
  if(isAuthed) {
    logout();
  }
  history.replace(routes.LOGIN) // Once signed out, send user to sign in page
  return null;
})

const mapStateToProps = (state) => {
  return {
    isAuthed: state.auth.isAuthorized
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(authSignOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut)