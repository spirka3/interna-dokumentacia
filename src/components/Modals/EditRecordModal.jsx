import React from "react";
import Modal from "react-bootstrap/Modal";
import DocumentForm from "../Forms/DocumentForm";
import TrainingForm from "../Forms/TrainingForm";
import {recordType} from "../../helpers/functions";

const EditRecordModal = ({setSavedRec, formData, setFormData, actual}) => {

  const closeModal = () => setFormData(undefined);
  const type = recordType(formData)

  return (
    <Modal show={true} onHide={closeModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit {type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {type === 'document'
          ? <DocumentForm
            setSavedRec={setSavedRec}
            formData={formData}
            setFormData={setFormData}
            actual={actual}
          />
          : <TrainingForm
            setSavedRec={setSavedRec}
            formData={formData}
            setFormData={setFormData}
            actual={actual}
          />
        }
      </Modal.Body>
    </Modal>
  )
}

export default EditRecordModal;
