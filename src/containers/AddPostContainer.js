import { connect } from 'react-redux'
import AddPost from "../components/AddPost";
import { postAdd } from '../actions/posts';

const mapStateToProps = (state) => {
  return {
    isAuthed: state.auth.isAuthorized
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: post => dispatch(postAdd(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);