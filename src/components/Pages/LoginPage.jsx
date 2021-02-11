import React, {useEffect, useState} from "react";
import {Redirect} from "react-router";
import useSessionStorage from "@rooks/use-sessionstorage";
import LoginForm from "../Forms/LoginForm";
import { useHistory } from "react-router-dom";

const LoginPage = () => {

  const history = useHistory();

  const [language, setLanguage] = useSessionStorage("language", "sk");
  const [user, setUser] = useSessionStorage("user", undefined);
  const [loginError, setLoginError] = useState("");

  let cardInput = '';
  const maxCardInputTimeDifference = 40;
  const cardInputLength = 10;
  let t = cardInputTimeout();
  clearTimeout(t);

  function cardInputTimeout() {
    return setTimeout(checkInput, maxCardInputTimeDifference);
  }

  function isLetter(e) {
    let aKeycode = 65;
    let zKeycode = 90;

    return e.keyCode >= aKeycode && e.keyCode <= zKeycode
  }

  function isNumber(e) {
    let zeroKeycode = 48;
    let nineKeycode = 57;

    return e.keyCode >= zeroKeycode && e.keyCode <= nineKeycode
  }

  function isValiable(e) {
    return isLetter(e) || isNumber(e)
  }

  function emptyCardInput() {
    cardInput = '';
  }

  function checkCard(cardInput) {
    let user = findByCard(cardInput);
    if(user !== undefined) {
      console.log(`${user.anet_id}`);
      //Here goes login based on user
    }
  }

  function checkInput() {
    if(cardInput.length === cardInputLength) {
      console.log(`checking card ${cardInput}`);
      checkCard(cardInput);
      emptyCardInput();
    } else {
      emptyCardInput();
      console.log('emptying input');
    }
  }

  const event = (e) => {
    //console.log(`${e.key} ${e.keyCode} ${String.fromCharCode(e.keyCode)}`)
    let engInput = String.fromCharCode(e.keyCode)
    if(isValiable(e)) {
      cardInput += engInput;
      clearTimeout(t);
      t = cardInputTimeout();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', event)
    return () => document.removeEventListener("keydown", event); // cleanup
  })

  const onSubmit = (data) =>{
    fetchLoginByPass(data)
  }

  const findByCard = (input) => {
    // TODO MATO find employee with cardID
    fetchLoginByCard(input)
  }

  const fetchLoginByPass = (data) => {
    fetch('/login', {
      method: "POST",
      body: new URLSearchParams(`login=${data.login}&password=${data.password}`)
    })
      .then(response => response.json())
      .then(res => {
        setUser({id: res.id, role: res.role})
        history.push("/")
      })
      .catch(() => setLoginError("Wrong login input"))
  }

  const fetchLoginByCard = (input) => {
    fetch('/kiosk', {
      method: "POST",
      body: new URLSearchParams(`card=${input}`)
    })
      .then(response => response.json())
      .then(res => {
        setUser({id: res.id, role: res.role})
        history.push("/")
      })
      .catch(() => setLoginError("Wrong card input"))
  }

  return (
    <>
      {user !== null
        ? <Redirect to="/missed-docs"/>
        : <LoginForm
          onSubmit={onSubmit}
          language={language}
          setLanguage={setLanguage}
          loginError={loginError}
        />
      }
    </>
  )
};

export default LoginPage
