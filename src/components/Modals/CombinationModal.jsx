import React, {useState} from "react";
import {Button, Col, Container, Form, Modal} from "react-bootstrap";
import CombinationForm from "../Forms/CombinationForm";
import uuid from 'react-uuid'
import {badMsg} from "../../helpers/functions";
import {CustomAlert} from "../Others/CustomAlert";

const CombinationModal = ({setShowModal, combinations, setAssignedTo, setEmptyAssign}) => {

  const [notification, setNotification] = useState();
  const [combination, setCombination] = useState({
    branch: [],
    city: [],
    department: [],
    division: []
  });

  const validCombination = () => {
    return combination.branch.length || combination.city.length || combination.department.length || combination.division.length
  }

  const add = () => {
    if (!validCombination()) {
      setNotification(badMsg('not valid combination'))
      return false
    }
    setNotification(undefined)
    setEmptyAssign([false])
    setAssignedTo(prevState => {
      return [...prevState, {...combination, id: uuid()}]
    });
    return true
  }

  const addClose = () => {
    const successful = add()
    if (successful) {
      closeModal();
    }
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <Modal show={true} onHide={closeModal} centered>
      <Container className="pt-3 pb-3 pl-5 pr-5">
      <Modal.Header closeButton>
        <Modal.Title>Add new combination</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CombinationForm
          combinations={combinations}
          combination={combination}
          setCombination={setCombination}
          notification={notification}
          setNotification={setNotification}
        />
      </Modal.Body>
      <Modal.Footer>
        <Col className="text-right">
          <Button onClick={add} size="sm" className="mr-2">Add next</Button>
          <Button onClick={addClose} size="sm" className="mr-2">Add and close</Button>
          <Button onClick={closeModal} variant="secondary" size="sm">close</Button>
        </Col>
      </Modal.Footer>
      </Container>
    </Modal>
  );
}

export default CombinationModal;
