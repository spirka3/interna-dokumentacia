import React, {createContext, useEffect, useState} from 'react';
import Routes from "./Routes";
import {BrowserRouter} from "react-router-dom";

import Navigation from "./Navigation.jsx";
import {getUser, removeUser, getFetch, redirectTo} from "./utils/functions";
import IdleTimer from "./utils/IdleTimer";
import {TIMEOUT} from "./utils/config/config";

import {comboFields} from "./utils/data";

export const PairContext = createContext(undefined)

function App() {

  const [pairs, setPairs] = useState({
    branches: [],
    divisions: [],
    cities: [],
    departments: []
  });

  /** Load all branches, divisions etc. to be able pair ids with names */
  useEffect(() => {
    const _pairs = {}
    comboFields.forEach(field => {
      getFetch(`/${field}`).then(data => _pairs[field] = data)
    })
    setPairs(_pairs)
  },[])

  /** Set timer to logout not active user after TIMEOUT expired
   *  onTimeOut the user will be logout and redirect to /login
   *  - TIMEOUT can be changed in /config folder */
  useEffect(() => {
    const timer = new IdleTimer({
      timeout: TIMEOUT,
      onTimeout: () => {
        if (getUser()) {
          removeUser()
          redirectTo('/login')
        }
      }
    })
    return () => timer.cleanUp()
  }, [])

  return (
    <PairContext.Provider value={pairs}>
      <BrowserRouter>
        <Navigation />
        <Routes />
      </BrowserRouter>
    </PairContext.Provider>
  )
}

export default App
