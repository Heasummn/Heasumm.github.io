import React from 'react'
import withRouter from "react-router/withRouter";
import * as routes from '../routes'
import asyncComponent from '../containers/AsyncComponent';
const AsyncEditor = asyncComponent(() => import('containers/Editor'));

const AddPost = props => {
  if(!props.isAuthed) {
    props.history.push(routes.HOME)
  }

  const addPost = (state) => {
    const {editorHtml, titleText, slug, description, intro} = state;
    props.addPost({
      title: titleText,
      slug,
      intro,
      description,
      body: editorHtml
    });
    props.history.push(`${routes.BLOG}/${slug}`);
  }

  return (
    <AsyncEditor
      submitText="Add Post"
      handleSubmit={addPost}
    />);
}

export default withRouter(AddPost);