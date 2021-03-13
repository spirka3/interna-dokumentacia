import React, {useState, useEffect} from "react";
import {Button, Form, Row, Alert} from "react-bootstrap";
import {ExclamationTriangle} from 'react-bootstrap-icons';

const SettingsPage = ({submitError}) => {

  const [divisions, setDivisions] = useState({})
  const [cardsFile, setCards] = useState(null)
  const [employeesFile, setEmployees] = useState({})
  const [cardsError, setCardsError] = useState("")
  const [employeesError, setEmployeesError] = useState("")
  const [showDeleted, setShowDeleted] = useState(null)

  const OK = "OK"

  useEffect(() => {
    let sessionDel = sessionStorage.getItem('showDeleted')
    if(sessionDel === null) {
      sessionStorage.setItem('showDeleted', false)
    } else if(showDeleted === null) {
      setShowDeleted(sessionDel)
    } else {
      document.getElementById('checkShowDeleted').checked = JSON.parse(showDeleted)
      sessionStorage.setItem('showDeleted', showDeleted)
    }
  }, [showDeleted])

  useEffect(() => {
    fetch('/divisions', {
      method: 'get',
      mode: 'no-cors'
    }).then(
      result => result.json()
    ).then(result => {
      renderDivs(result)
      setDivisions(result)
    })

  }, [])

  const renderDivs = (result) => {
    let select = document.getElementById("selectDivision")
    for(let i=0; i<result.length; i++) {
      let name = result[i]['name']
      let value = result[i]['id']
      let option = new Option(name, value)
      select.options.add(option)
    }
  }

  const placeholderOption = () => {
    return (
      <option key={-1} disabled value="default">Select division</option>
    )
  }

  const createMenu = () => {
    let menu = []
    menu.push(placeholderOption())
    return menu
  }

  const changeCards = (e) => setCards(e.target.files[0])

  const uploadCards = (e) => {
    clearErrors()
    const data = new FormData();
    let name = `kiosk_upload_${Date.now()}`

    data.append('file', cardsFile)
    data.append('name', name)

    console.log(cardsFile)

    if(cardsFile!=null) {
      fetch("http://localhost:7777/file/upload", {
        mode: 'no-cors',
        method: "POST",
        body: data
      }).then(function (res) {
        setCardsError(OK)
        if (res.ok) {
          alert("Perfect! ");
        } else if (res.status === 401) {
          alert("Oops! ");
        }
      }, function (e) {
        alert("Error submitting form!");
      });
    } else {
      let msg = "File not set"
      setCardsError(msg)
    }
  }

  const changeEmployees = (e) => setEmployees(e.target.files[0])

  const uploadEmployees = (e) => {
    clearErrors()

    const data = new FormData();
    let name = `employees_upload_${Date.now()}`

    const select = document.getElementById("selectDivision");
    const divId = select.value;

    if(divId !== "default" && employeesFile.name !== undefined) {
      data.append('file', employeesFile)
      data.append('name', name)
      data.append('division', divId)

      fetch("http://localhost:7777/file/upload", {
        mode: 'no-cors',
        method: "POST",
        body: data
      }).then(function (res) {
        setEmployeesError(OK)
        if (res.ok) {
          alert("Perfect! ");
        } else if (res.status === 401) {
          alert("Oops! ");
        }
      }, function (e) {
        alert("Error submitting form!");
      });
    } else {
      let msg = ""
      if(divId === "default") msg = "Division is not set"
      else msg = "File is not set"
      setEmployeesError(msg)
    }
  }

  const renderError = (msg) => {
    return (
      <Alert variant="danger" style={{color: "red"}}>
        <ExclamationTriangle size="18" style={{margin: "5px", padding: "5px"}}/> {msg}
      </Alert >
    )
  }

  const renderOk = () => {
    let msg = "Successfully uploaded."
    return (
      <Alert variant="success" style={{color: "green"}}>
        <ExclamationTriangle size="18" style={{margin: "5px", padding: "5px"}}/> {msg}
      </Alert >
    )
  }

  const clearErrors = () => {
    setEmployeesError("")
    setCardsError("")
  }
  const isError = (what) => what !== "" && what !== OK
  const isOk = (what) => what === OK

  const changeShowDeleted = () => {
    setShowDeleted(!showDeleted)
  }

  return (
    <div>
      <script crossOrigin="true"/>
      <p className="pt-5"><strong>IMPORT EMPLOYEES</strong></p>
      <Form>
        <select className="mb-3" defaultValue="default" id="selectDivision">
          {createMenu()}
        </select>
        <span> Choose division</span>
        <br/>
        <input type="file" required onChange={changeEmployees}/>
        <Button type="button" onClick={uploadEmployees} >Upload</Button>
        { isError(employeesError) && renderError(employeesError)}
        { isOk(employeesError) && renderOk()}
      </Form>
      <hr/>
      <p className="pt-5"><strong>IMPORT CARDS</strong></p>
      <Form>
        <p>Upload file with employee card information.</p>
        <input type='file' id="cardsFile" onChange={changeCards}/>
        <Button type="button" onClick={uploadCards}>Upload</Button>
        { isError(cardsError) && renderError(cardsError)}
        { isOk(cardsError) && renderOk()}
      </Form>
      <hr/>
      {/* SHOW DELETED EMPLOYEES */}
      <div className="form-check mt-5">
        <input className="form-check-input" type="checkbox" value="" id="checkShowDeleted" onClick={changeShowDeleted}/>
        <strong>SHOW DELETED EMPLOYEES</strong>
      </div>
    </div>
  )
}

export default SettingsPage;

