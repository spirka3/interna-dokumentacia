import React from "react";
import {Button, ButtonGroup, Col, Row, Badge} from "react-bootstrap";
import {ExclamationTriangle} from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import {employees} from "../../helpers/data";

export const RowButtons = ({setEvent, setShowModal, handleAccept, handleExport}) => {

  const handleClick = (e) => {
    if (e.target.id === "cancel") {
      handleAccept()
    } else {
      setShowModal(true)
    }
    setEvent(e.target.id)
  }

  return (
    <Row>
      <Col xs="2">
        <Button id="export" variant="dark" onClick={handleExport}>Export</Button>
      </Col>
      <Col className="text-right">
        <ButtonGroup className="div-btn" onClick={handleClick}>
          <Button id="sign">Sign</Button>
          <Button id="cancelDuty">Cancel duty</Button>
          <Button id="trainAgain">Train again</Button>
          <Button id="cancel" onClick={handleClick}>Cancel</Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}

export const Legend = () => {

  const Badge = ({color, textColor="white", label, text}) => {
    const style = {
      background: color,
      borderColor: color,
      color: textColor,
      width: "100px"
    }
    return <p><Button style={style} size="sm">{label}</Button>{` ${text}`}</p>
  }

  return (
    <div style={{marginTop: "8rem"}}>
      <h5 className="pb-2">Legend:</h5>
      <Badge label="no need" text="Zamestnanec bol odznačený z potreby oboznámenia" color="gray"/>
      <Badge label="miss e+s" text="Ani zamestnanec ani nadriadený ešte nepotvrdili" color="tomato"/>
      <Badge label="miss e" text="Zamestnanec nepotvrdil" color="orange"/>
      <Badge label="miss s" text="Nadriadený nepotvrdil" color="gold" textColor="white"/>
      <Badge label="well done" text="Dokument je potvrdený" color="green"/>
      <Badge label="not sent" text="Este neodoslane" color="cornflowerblue"/>
      {/*<p><Button style={style("cornflowerblue")} size="sm">not sent</Button>{' '}Este neodoslane</p>*/}
      <p>hviezdička <strong>*</strong> znamena, ze zamestnanec sa opakovane preškoluje</p>  // TODO
      <p><ExclamationTriangle style={{color: "red"}}/>{' '}Uplynul deadline a chýbajú podpisy</p>
    </div>
  )
}