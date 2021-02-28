import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Redirect} from "react-router";

import './App.css';
import LoginPage from "./components/Pages/LoginPage.jsx";
import Navigation from "./components/Others/Navigation.jsx";
import RecordsToSignPage from "./components/Pages/RecordsToSignPage.jsx";
import SignedRecordsPage from "./components/Pages/SignedRecordsPage.jsx";
import AddRecordPage from "./components/Pages/AddRecordPage.jsx";
import FinderPage from "./components/Pages/FinderPage.jsx";
import SettingsPage from "./components/Pages/SettingsPage.jsx";
import LogoutPage from "./components/Pages/LogoutPage";
import {isAdmin, getUser, removeUser} from "./helpers/functions";
import Container from "react-bootstrap/Container";
import IdleTimer from "./helpers/IdleTimer";
import SavedRecordsPage from "./components/Pages/SavedRecordsPage";
import Page404 from "./components/Pages/Page404";
import {TIMEOUT} from "./config/config";

function App() {

  const user = getUser()
  const admin = isAdmin()

  /** Set timer to logout not active user after TIMEOUT expired
   *  onTimeOut the user will be logout and redirect to /login
   *  - TIMEOUT can be changed in /config folder */
  useEffect(() => {
    const timer = new IdleTimer({
      timeout: TIMEOUT,
      onTimeout: () => {
        if (user !== null) {
          removeUser()
          window.location.reload(false) // reload page
        }
      }
    })

    return () => { timer.cleanUp() }
  }, [])

  /** Show the component only when the user is logged in
   *  Otherwise, redirect the user to login page */
  const Private = ({ component: Component, ...rest }) => {
    if (user === null) {
      return <Redirect to="/login" />
    }
    return <Route {...rest} render={props => <Component {...props} />} />
  }

  return (
    <Router>
      <Navigation/>
      <Container>
        <Switch>
          {/* HomeRoute */}
          <Route exact path="/"
            render={() => {
             return ( getUser() !== null
               ? <Redirect to="/records-to-sign" component={RecordsToSignPage}/>
               : <Redirect to="/login" component={LoginPage}/>
             )}}
          />
          <Route path='/login' component={LoginPage}/>
          <Route path='/logout' component={LogoutPage}/>
          {/* Private Routes */}
          <Private path="/records-to-sign" component={RecordsToSignPage}/>
          <Private path="/signed-records" component={SignedRecordsPage}/>
          {/* Admin Routes */}
          { admin && <>
            <Private path="/add-record" component={AddRecordPage}/>
            <Private path="/saved-record" component={SavedRecordsPage}/>
            <Private path="/settings" component={SettingsPage}/>
          </> }
          {/* Not matched paths */}
          <Route path="*" component={Page404}/>
        </Switch>
      </Container>
      <div className="large-container">
        {/* Routes with larger width then Container */}
        {admin && <Private path="/finder" component={FinderPage}/>}
      </div>
    </Router>
  )
}

export default App
