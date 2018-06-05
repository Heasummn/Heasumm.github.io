import React, {Component} from 'react'
import withRouter from 'react-router/withRouter';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { postFetchRequest, postUpdate, postDelete } from "../actions";
import * as routes from '../routes'

import Content from 'bloomer/lib/elements/Content';
import Title from 'bloomer/lib/elements/Title';
import Section from 'bloomer/lib/layout/Section';
import Breadcrumb from 'bloomer/lib/components/Breadcrumb/Breadcrumb';
import BreadcrumbItem from 'bloomer/lib/components/Breadcrumb/BreadcrumbItem';
import Container from 'bloomer/lib/layout/Container';
import Button from 'bloomer/lib/elements/Button';
import AsyncEditor from 'containers/AsyncEditor'


class BlogPost extends Component {

  constructor() {
    super();
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);    
    this.state = { editing: false };
  }

  update(state) {
    const { post, history } =  this.props;
    const {editorHtml, titleText, description, slug, intro} = state;
    this.props.update({ 
      title: titleText,
      description,
      slug,
      intro,
      body: editorHtml,
      initialSlug: post.slug
    });
    this.setState({ editing: false });
    history.push(`${routes.BLOG}/${slug}`);
  }

  delete(event) {
    const { post, history } = this.props;
    this.props.deletePost(post.slug);
    this.setState({editing: false});
    history.push(routes.HOME);
  }

  componentDidMount() {
    let { fetchPost, match } = this.props;
    fetchPost(match.params.slug);
  }
  
  renderPost(post, isAuthed) {
    if(this.state.editing) {
      return (
        <Section>
        <Container>
          <Button onClick={() => this.setState({ editing: false })}>Back</Button>
          <AsyncEditor 
            submitText="Update"
            initialBody={ post.body }
            initialTitle={ post.title }
            initialDescription={ post.description }
            initialSlug={ post.slug }
            handleSubmit={ this.update }
            delete={ this.delete }
          />
        </Container>
        </Section>
      )
    }
    else {
      let elements = [
          <Breadcrumb key='breadcrumb'>
            <ul>
              <BreadcrumbItem key='home'><Link to={routes.HOME}>Home</Link></BreadcrumbItem>
              <BreadcrumbItem key='current' isActive><a>{post.title}</a></BreadcrumbItem>              
            </ul>
          </Breadcrumb>,
          <Title key="title">{post.title}</Title>,
          <Content key="body" dangerouslySetInnerHTML={{__html: post.body}} ></Content>
      ];
      if(isAuthed) {
        elements = [<Button key="edit" isColor='info' style={{marginBottom: '1rem'}} onClick={() => this.setState({ editing: true })}>Edit</Button>].concat(elements);
      }
      return <Section><Container>{elements}</Container></Section>;
    }
  }

  renderPostOrError() {
    let { post, error, isAuthed } = this.props;
    if(error) {
      return <p>{error}</p>
    } else if(post) {
      return this.renderPost(post, isAuthed);
    }
    return null;
  }

  loadingOrData() {
    let { loading } = this.props;
    if(loading) {
      return <p>Loading...</p>
    } else {
      return this.renderPostOrError();
    }
  }

  render() {
    return this.loadingOrData();
  }
}

BlogPost =  withRouter(BlogPost);

const mapStateToProps = state => {
  return {
    loading: state.currentPost.loading,
    post: state.currentPost.data,
    error: state.currentPost.error,
    isAuthed: state.auth.isAuthorized
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: slug => dispatch(postFetchRequest(slug)),
    update: post => dispatch(postUpdate(post)),
    deletePost: slug => dispatch(postDelete(slug))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost)