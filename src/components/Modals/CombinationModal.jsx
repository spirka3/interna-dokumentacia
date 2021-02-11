import React, {useState} from "react";
import {Button, Container, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import CombinationForm from "../Forms/CombinationForm";

const CombinationModal = ({showModal, setShowModal, combinations, setCombinations, setEmptyCombinations}) => {

  const [combination, setCombination] = useState({
    id: '', // TODO ME
    branch: [],
    city: [],
    department: [],
    division: []
  });

  const add = () => {
    setEmptyCombinations([false])
    setCombinations([...combinations, {...combination, id: combinations.length}]);
  }

  const addClose = () => {
    add()
    closeModal();
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Container className="pt-3 pb-3 pl-5 pr-5">
      <Modal.Header closeButton>
        <Modal.Title>Add new combination</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CombinationForm combination={combination} setCombination={setCombination}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={add}>Add next</Button>
        <Button onClick={addClose}>Add and close</Button>
        <Button onClick={closeModal} variant="secondary">close</Button>
      </Modal.Footer>
      </Container>
    </Modal>
  );
}

export default CombinationModal;
