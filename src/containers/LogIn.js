import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import { authRequest } from "../actions";
import * as routes from '../routes'
import Field from 'bloomer/lib/elements/Form/Field/Field';
import Input from 'bloomer/lib/elements/Form/Input';
import Section from 'bloomer/lib/layout/Section';
import Container from 'bloomer/lib/layout/Container';
import Columns from 'bloomer/lib/grid/Columns';
import Column from 'bloomer/lib/grid/Column';
import Box from 'bloomer/lib/elements/Box';
import Label from 'bloomer/lib/elements/Form/Label';
import Button from 'bloomer/lib/elements/Button';
import Help from 'bloomer/lib/elements/Form/Help';

const INITIAL_STATE = {
  email: '',
  password: '',
}

class LogIn extends Component {

  constructor() {
    super()
    this.state = INITIAL_STATE;
  }

  renderPage() {
    const isValid = this.state.password !== '' && this.state.email !== '';    
    return (
<Section>
<Container>
<Columns>
      <Column isOffset="1/3" isSize="1/3"> 
<Box>
        <form onSubmit={this.onSubmit}>
          <Field>
            <Label>Email</Label>
            <Input
              value={this.state.email}
              onChange={e => { this.setState({email: e.target.value}) } }
              type="email"
              placeholder="Email"
            />
          </Field>
          <Field>
            <Label>Password</Label>
            <Input 
              value={this.state.password}
              onChange={e => { this.setState({password: e.target.value}) } }
              type="password"
              placeholder="Password"
            />
          </Field>
          <Field>
            <Button isColor="primary" disabled={!isValid} type="submit">
              Sign In
            </Button>
            { this.props.error && <Help isColor="danger">{this.props.error}</Help> }  
          </Field>
          </form>
</Box>
        </Column>
</Columns>
</Container>
</Section>
    );
  }

  onSubmit = (event) => {
    this.props.authenticate(this.state.email, this.state.password);
    this.setState(INITIAL_STATE);
    event.preventDefault();
    setTimeout(() => {
      if(!this.props.error) {
        this.props.history.push(routes.HOME);
      }
    }, 1000)

  }

  render() {
    return (
      this.props.isAuthed ? <h1>Already Signed In</h1> : this.renderPage()
    );
  }
}

LogIn = withRouter(LogIn);

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isAuthed: state.auth.isAuthorized
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (email, password) => dispatch(authRequest({email, password}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)