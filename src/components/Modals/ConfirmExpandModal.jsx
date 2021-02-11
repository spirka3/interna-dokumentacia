import React from "react";
import {Button, Modal} from "react-bootstrap";

const ConfirmExpandModal = ({showModal, setShowModal, modalInfo, handleAccept}) => {

  const closeModal = () => setShowModal(false);

  const onAccept = () => {
    handleAccept();
    closeModal();
  };
  console.log(modalInfo)
  const name = modalInfo.employee.first_name + ' ' + modalInfo.employee.last_name

  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you really want to sign document for {name}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onAccept}>Accept</Button>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmExpandModal;
