import React, {useState} from "react";
import {Button, Col, Container, Modal} from "react-bootstrap";
import CombinationForm from "../Forms/CombinationForm";
import uuid from 'react-uuid'
import {badMsg, isValidCombination, resolveCombinations} from "../../helpers/functions";

const CombinationModal = ({prefill, combinations, setAssignedTo, setEmptyAssign, closeModal}) => {

  const [notification, setNotification] = useState();
  const [employees, setEmployees] = useState(null);
  const [combination, setCombination] = useState(prefill ? prefill : {
      branch: [],
      division: [],
      department: [],
      city: [],
      removedEmployees: []
    }
  )

  const preview = () => {
    if (!isValidCombination(combination)) { // TODO or empty
      setNotification(badMsg('Neboli najdeni ziadni zamestnanci'))
      return
    }
    const assignedTo = resolveCombinations([combination])
    console.log(assignedTo)

    // FIX status 500
    // getEmployees(assignedTo)

    fetch(`/employees/${assignedTo}`, {
      mode: 'no-cors',
      method: "GET",
    })
      .then(data => data.json())
      .then(data => resolveEmployees(data))
      .catch((e) => console.log("Errrrrrrrrrrror", e))
  }

  const resolveEmployees = (data) => {
    setEmployees(data.map(d => {
      return {
        value: d.id,
        label: `${d.first_name} ${d.last_name}`
      }
    }))
  }

  const getEmployees = (assignedTo) => {
    console.log(assignedTo)
    return fetch(`/employees/${assignedTo}`, {
      mode: 'no-cors',
      method: "GET",
    })
      .then(data => {
        console.log(data)
      })
      .catch(() => console.log("Errrrrrrrrrrror"))
  }

  const save = () => {
    if (!isValidCombination(combination)) {
      setNotification(badMsg('not valid combination'))
      return false
    }
    setNotification(undefined)
    setEmptyAssign([false])

    setAssignedTo(prev => {
      return prev.map(c => {
        if (c.id === prefill?.id) {
          return {...combination, id: uuid()}
        }
        return c
      })
    })
    closeModal()
    return true
  }

  const add = () => {
    if (!isValidCombination(combination)) {
      setNotification(badMsg('not valid combination'))
      return false
    }
    setNotification(undefined)
    setEmptyAssign([false])
    setAssignedTo(prevState => {
      return [...prevState, {...combination, id: uuid()} ]
    });
    return true
  }

  const addClose = () => {
    const successful = add()
    if (successful) closeModal()
  }

  return (
    <Modal show={true} onHide={closeModal} centered>
      <Container className="pt-3 pb-3 pl-5 pr-5">
      <Modal.Header closeButton>
        <Modal.Title>Add new combination</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CombinationForm
          prefill={prefill}
          employees={employees}
          combinations={combinations}
          combination={combination}
          setCombination={setCombination}
          notification={notification}
          setNotification={setNotification}
        />
      </Modal.Body>
      <Modal.Footer>
        <Col className="text-center">
          <Button onClick={preview} size="sm" className="mr-2">Preview</Button>
          {prefill
            ? <Button onClick={save} size="sm" className="mr-2">Save</Button>
            : <>
                <Button onClick={add} size="sm" className="mr-2">Add next</Button>
                <Button onClick={addClose} size="sm" className="mr-2">Add and close</Button>
              </>
          }
          <Button onClick={closeModal} variant="secondary" size="sm">close</Button>
        </Col>
      </Modal.Footer>
      </Container>
    </Modal>
  );
}

export default CombinationModal;
