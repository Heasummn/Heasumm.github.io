import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import * as routes from 'routes'
import Navbar from 'bloomer/lib/components/Navbar/Navbar';
import NavbarBrand from 'bloomer/lib/components/Navbar/NavbarBrand';
import NavbarItem from 'bloomer/lib/components/Navbar/NavbarItem';
import NavbarMenu from 'bloomer/lib/components/Navbar/NavbarMenu';
import NavbarStart from 'bloomer/lib/components/Navbar/NavbarStart';
import NavbarBurger from 'bloomer/lib/components/Navbar/NavbarBurger';
import NavbarEnd from 'bloomer/lib/components/Navbar/NavbarEnd';

class Navigation extends Component {
  constructor() {
    super();
    this.state = { isActive: false };
    this.onClickNav = this.onClickNav.bind(this);
  }

  onClickNav() {
    this.setState({ isActive: !this.state.isActive });
  }

  render() {
    return (
<Navbar>
    <NavbarBrand>
      <NavbarItem>Heasummn's Blog</NavbarItem>
      {/* Another Login/Logout link, hide on desktop, show on mobile. That way it is not in burger menu */}
      { this.props.isAuthed ? <AuthNav isHidden="desktop" /> : <NoAuthNav isHidden="desktop" /> }
      <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav}></NavbarBurger>
    </NavbarBrand>
    <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
      <NavbarStart>
        <NavbarItem><Link to={routes.HOME}>Home</Link></NavbarItem>
      </NavbarStart>
      <NavbarEnd style={{marginRight: '2rem' }}>
        { this.props.isAuthed ? <AuthNav isHidden='touch' /> : <NoAuthNav isHidden='touch' /> }
      </NavbarEnd>
    </NavbarMenu>
</Navbar>
    );
  }
}

const AuthNav = (props) =>
  <NavbarItem {...props}><Link to={routes.LOGOUT}> Log out</Link></NavbarItem>


const NoAuthNav = (props) =>
  <NavbarItem {...props}><Link to={routes.LOGIN}> Log In </Link></NavbarItem>



const mapStateToProps = (state) => {
  return {
    isAuthed: state.auth.isAuthorized
  }
}

export default connect(mapStateToProps)(Navigation)