import React from 'react'
import withRouter from "react-router/withRouter";
import * as routes from 'routes'
import Section from 'bloomer/lib/layout/Section';
import Container from 'bloomer/lib/layout/Container';
import AsyncEditor from 'containers/AsyncEditor'

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
<Section>
<Container>
    <AsyncEditor
      submitText="Add Post"
      handleSubmit={addPost}
    />
</Container>
</Section>
  );
}

export default withRouter(AddPost);