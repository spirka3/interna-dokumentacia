import React from 'react';
import {Navbar, Nav, NavLink} from 'react-bootstrap';
import {getUser, isAdmin} from "../../helpers/functions";

const Navigation = ({location}) => {

  const user = getUser();
  const admin = isAdmin();

  const LoginNav = () => {
    return (
      <>
        <NavLink href="/records-to-sign">Records to sign</NavLink>
        <NavLink href="/signed-records">Signed records</NavLink>
        {admin &&
          <>
          <NavLink href="/add-record">Add Record</NavLink>
          <NavLink href="/saved-record">Saved Record</NavLink>
          <NavLink href='/finder'>Finder</NavLink>
          <NavLink href='/settings'>Settings</NavLink>
          </>
        }
        <NavLink href='/logout'>Log out</NavLink>
      </>
    )
  };

  const LogoutNav = () => {
    return (
      <NavLink href='/'>Sing in</NavLink>
    )
  };

  return (
    <Navbar expand="md" bg="dark" variant="dark" className="sticky-nav">
      <Navbar.Brand href="#home">
        <img
          alt="logo"
          src="/gefco_logo.png"
          width="50"
          height="50"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle/>
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto" variant="pills" activeKey={location.pathname}>
        {user !== null ? <LoginNav/> : <LogoutNav/>}
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default Navigation;
