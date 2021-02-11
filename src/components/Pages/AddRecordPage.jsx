import React, {useState} from 'react';
import {Button, ButtonGroup, Container} from 'react-bootstrap';
import DocumentForm from "../Forms/DocumentForm";
import TrainingForm from "../Forms/TrainingForm";
import SavedRecords from "../Tables/SavedRecords";

const AddRecordPage = () => {

  const [formType, setFormType] = useState('new_document');
  const [formData, setFormData] = useState();

  const handleClick = (event) => {
    setFormType(event.target.id)
  };

  const handleDatabase = (type, data, action) => {
    let id
    if (formData === undefined) {
      id = insertRecord(type, data) // TODO insert
    } else {
      id = updateRecord(type, data) // TODO update
    }
    if (action === "send"){
      sendRecord(type, id) // TODO send
    }
    return null // vratit vysledok ci sa to podarilo
  }

  const insertRecord = (record, data) => { // TODO test
    return fetch(`/${record}/create`, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(res => {
        console.log(res)
        return res; // id
      })
      .catch((e) => console.log(e))
  }

  const sendRecord = (record, id) => { // TODO test
    return fetch(`/${record}/confirm`, {
      method: "POST",
      body: new URLSearchParams(`${record}=${id}`)
    })
      .then(response => response.json())
      .then(res => {
        console.log(res)
        return res;
      })
      .catch((e) => console.log(e))
  }

  const updateRecord = (record, data, id) => { // TODO
    return fetch(`/${record}/update`, {
      // ...
    })
  }

  const active = id => formType === id && 'active'

  return (
    <Container className="w-80">
      <ButtonGroup onClick={handleClick} className="btn-group btn-header">
        <Button id="new_document" className={active("new_document")}>Document</Button>
        <Button id="new_training" className={active("new_training")}>Online training</Button>
        <Button id="editable_docs" className={active("editable_docs")}>Saved records</Button>
      </ButtonGroup>
      {formType === 'new_document' &&
        <DocumentForm
          data={formData}
          handleDatabase={handleDatabase}
        />
      }
      {formType === 'new_training' && // elif
        <TrainingForm
          data={formData}
          handleDatabase={handleDatabase}
        />
      }
      {formType === 'editable_docs' && // elif
        <SavedRecords
          setFormType={setFormType}
          setFormData={setFormData}
        />
      }
    </Container>
  )
}

export default AddRecordPage;
