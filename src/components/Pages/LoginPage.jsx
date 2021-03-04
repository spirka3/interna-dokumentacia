import React, {useEffect, useState} from "react";
import {Redirect} from "react-router";
import useSessionStorage from "@rooks/use-sessionstorage";
import LoginForm from "../Forms/LoginForm";
import {badMsg, getUser} from "../../helpers/functions";

const LoginPage = () => {

  const [language, setLanguage] = useSessionStorage("language", "sk");
  const [notification, setNotification] = useState();

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

  function isValuable(e) {
    return isLetter(e) || isNumber(e)
  }

  function resetCardInput() {
    cardInput = '';
  }

  function checkInput() {
    if(cardInput.length === cardInputLength) {
      findByCard(cardInput);
    }
    resetCardInput();
  }

  const event = (e) => {
    let engInput = String.fromCharCode(e.keyCode).toLowerCase()
    if(isValuable(e)) {
      cardInput += engInput;
      clearTimeout(t);
      t = cardInputTimeout();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', event)
    return () => document.removeEventListener("keydown", event); // cleanup
  })

  const setUser = (data) => {
    const user = {
      id: data.id,
      role: data.role
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    window.location.reload(false) // reloadPage
  }

  const onSubmit = (data) => {
    fetch('/auth/login', {
      method: "POST",
      body: new URLSearchParams(`email=${data.email}&password=${data.password}`)
    })
      .then(response => response.json())
      .then(data => { setUser(data) })
      .catch(() => setNotification(badMsg("Wrong login input")))
  }

  const findByCard = (input) => {
    fetch('/auth/kiosk', {
      method: "POST",
      body: new URLSearchParams(`card=${input}`)
    })
      .then(response => response.json())
      .then(data => { setUser(data) })
      .catch(() => setNotification(badMsg("Wrong card input")))
  }

  if (getUser() !== null)
    return <Redirect to="/records-to-sign"/>

  return (
    <LoginForm
      onSubmit={onSubmit}
      language={language}
      setLanguage={setLanguage}
      notification={notification}
    />
  )
};

export default LoginPage
