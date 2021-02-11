import React from "react";
import {Button, ButtonGroup, Col, Row, Badge, Card} from "react-bootstrap";
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
    <Card style={{ width: '35rem', marginTop: '8rem' }}>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">Legend:</Card.Subtitle>
        <Card.Text>
          <Badge label="no need" text="Zamestnanec bol odznačený z potreby oboznámenia" color="gray"/>
          <Badge label="miss e+s" text="Ani zamestnanec ani nadriadený ešte nepotvrdili" color="tomato"/>
          <Badge label="miss e" text="Zamestnanec nepotvrdil" color="orange"/>
          <Badge label="miss s" text="Nadriadený nepotvrdil" color="gold" textColor="white"/>
          <Badge label="well done" text="Dokument je potvrdený" color="green"/>
          <Badge label="not sent" text="Este neodoslane" color="cornflowerblue"/>
          <p><ExclamationTriangle style={{color: "red", marginBottom: "4px"}}/>{' '}Uplynul deadline a chýbajú podpisy</p>
          {/* TODO hviezdicka */}
          <p>hviezdička <strong>*</strong> znamena, ze zamestnanec sa opakovane preškoluje</p>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}