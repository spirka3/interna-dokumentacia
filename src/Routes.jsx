import React from 'react';
import Container from "react-bootstrap/Container";
import {Route, Switch} from "react-router-dom";
import {getUser, isAdmin} from "./utils/functions";
import {Redirect} from "react-router";
import RecordsToSignPage from "./unsigned-records/RecordsToSignPage";
import LoginPage from "./auth/LoginPage";
import LogoutPage from "./auth/LogoutPage";
import SignedRecordsPage from "./signed-records/SignedRecordsPage";
import AddRecordPage from "./add-record/AddRecordPage";
import SavedRecordsPage from "./saved-records/SavedRecordsPage";
import SettingsPage from "./settings/SettingsPage";
import Page404 from "./Page404";
import FinderPage from "./finder/FinderPage";
import ReportPage from "./finder/report/ReportPage";

const Routes = () => {

  const user = getUser()
  const admin = isAdmin()

  /** Show the component only when the user is logged in
   *  Otherwise, redirect the user to login page */
  const Private = ({ component: Component, ...rest }) => {
    if (!user) {
      return <Redirect to="/login" />
    }
    return <Route {...rest} render={props => <Component {...props} />} />
  }

  return (
    <>
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
          <Private path="/records-to-sign" component={RecordsToSignPage}/>
          <Private path="/signed-records" component={SignedRecordsPage}/>
          { admin && <>
            <Private path="/add-record" component={AddRecordPage}/>
            <Private path="/saved-record" component={SavedRecordsPage}/>
            <Private path="/settings" component={SettingsPage}/>
            <Private path="/report" component={ReportPage}/>
          </> }
          <Route path="*" component={Page404}/>
        </Switch>
      </Container>
      <div className="large-container">
        {admin && <Private path="/finder" component={FinderPage}/>}
      </div>
    </>
  );
};

export default Routes;
