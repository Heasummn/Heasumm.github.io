import React, { Component } from 'react';
import withRouter from 'react-router/withRouter';
import { connect } from 'react-redux'

import { postsFetchRequest } from "actions";
import * as routes from 'routes';
import PostItem from 'components/PostItem';
import Button from 'bloomer/lib/elements/Button';
import Section from 'bloomer/lib/layout/Section';


class PostsList extends Component {
  constructor() {
    super();
    this.addPost = this.addPost.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  addPost() {
    this.props.history.push(routes.ADD_POST);
  }

  renderElements() {
    let add = [];
    if(this.props.isAuthed) {
      add = [<Section key="add"><Button onClick={this.addPost}>Add Post</Button></Section>]
    }
    return add.concat(this.props.posts.map((post) => {
      return <PostItem key={post.id} post={post} />
    }))
  }

  displayLoadingOrData() {
    if(this.props.loading) {
      return <p>Loading...</p>
    } else {
      return this.renderElements();
    }
  }

  render() {
    return <ul>{this.displayLoadingOrData()}</ul>
  }
}

PostsList = withRouter(PostsList);



const mapStateToProps = state => {
  return {
    isAuthed: state.auth.isAuthorized,
    loading: state.posts.loading,
    posts: state.posts.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(postsFetchRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)