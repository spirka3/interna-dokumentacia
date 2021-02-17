import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import MyHookForm from "./MyHookForm";
import {Row, Col, Form, Button} from "react-bootstrap";
import {Typeahead} from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {CustomAlert} from "../Others/CustomAlert";
import {
  badMsg,
  goodMsg,
  correctTrainingFormData,
  successResponse,
  prefillTrainingForm, getEmployeesNames, getFormID
} from "../../helpers/functions";
import {trn_form} from "../../helpers/data";

const TrainingForm = ({setSavedRec, formData, actual}) => {
  // formData = trn_form
  const {register, handleSubmit} = useForm({
    defaultValues: prefillTrainingForm(formData)
  });

  const [currentID, setCurrentID] = useState(getFormID(formData))
  const [notification, setNotification] = useState()
  const [employees, setEmployees] = useState([])
  const [attendees, setAttendees] = useState([])
  const [emptyAttendees, setEmptyAttendees] = useState([true])
  useEffect(() => setNotification(undefined), emptyAttendees)

  useEffect(() => {
    fetch('/all_employees', {
      method: "GET",
    })
      .then(response => response.json())
      .then(res => {
        setEmployees(res)
        setAttendees(getEmployeesNames(formData.employees, res))
      })
      .catch((e) => console.log(e))
  },[])

  const onSubmit = (data, event) => {
    if (attendees.length === 0){
      setNotification(badMsg("At least one employee is required"))
      return
    }

    data = correctTrainingFormData(data, attendees)
    console.log(data)
    const action = event.target.id

    if (action === "save")
      if (currentID) {
        data = {...data, id: currentID}
        upsert(data, 'update')
        updateSavedRec(data)
      } else {
        upsert(data, 'create')
          .then(r => setCurrentID(r.id))
      }
    if (action === "send"){
      if (currentID) {
        data = {...data, id: currentID}
        if (actual) {
          upsertConfirm(data, 'create/confirm')
            .then(r => setCurrentID(r.id))
        } else {
          upsertConfirm(data, 'update/confirm')
        }
      } else {
        upsertConfirm(data, 'create/confirm')
          .then(r => setCurrentID(r.id))
      }
      filterSavedRec(data) // TODO TEST ma to byt aj tu?
      updateSavedRec(data) // TODO TEST ma to byt aj tu?
    }
  }

  const upsert = (data, action) => {
    return fetch(`/training/${action}`, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => {
        if (successResponse(res)) {
          setNotification(goodMsg(`${action} was successful`))
        } else {
          setNotification(badMsg(`${action} failed`))
        }
        return res.json()
      }).catch((e) => console.log('error', e))
  }

  const upsertConfirm = (data, action) => {
    return fetch(`/training/${action}`, {
      method: "POST",
      body: JSON.stringify(data)
    }).then(res => {
      if (successResponse(res)) {
        setNotification(goodMsg(`${action} was successful`))
      } else {
        setNotification(badMsg(`${action} failed`))
      }
      return res.json()
    }).catch((e) => console.log('error', e))
  }

  const filterSavedRec = (data) => {
    setSavedRec(prevState => prevState.filter(p => p.id === data.id))
  }

  const updateSavedRec = (data) => {
    setSavedRec(prevState => {
      let update = prevState
      const foundID = prevState.findIndex(p => p.id === data.id)
      update[foundID] = data
      console.log('cur', prevState)
      return update
    })
  }

  const addAttendees = (attendee) => {
    setAttendees(attendee)
    setEmptyAttendees([false])
  }

  return (
    <Form
      onChange={()=>setNotification(undefined)}
    >
      {/* NAME */}
      <MyHookForm
        label="Training name*"
        name="name"
        placeholder="Enter document name"
        register={register({required:true})}
      />
      {/* TRAINEE */}
      <MyHookForm
        label="Name of lector"
        name="lector"
        placeholder="Enter document link to sharepoint"
        register={register}
      />
      {/* AGENCY */}
      <MyHookForm
        label="Name of agency"
        name="agency"
        placeholder="Enter agency"
        register={register}
      />
      {/* PLACE */}
      <MyHookForm
        label="Place"
        name="place"
        placeholder="Enter place"
        register={register}
      />
      {/* DATE */}
      <MyHookForm
        label="Date*"
        name="date"
        type="date"
        placeholder="Enter date"
        register={register({required:true})}
      />
      {/* DEADLINE */}
      <MyHookForm
        label="Days to deadline*"
        name="deadline"
        type="date"
        defaultValue="14"
        register={register({required:true})}
      />
      {/* DURATION */}
      <MyHookForm
        label="Duration"
        name="duration"
        type="number"
        placeholder="Enter duration"
        register={register({valueAsNumber: true})}
      />
      {/* AGENDA */}
      <MyHookForm
        label="Agenda*"
        name="agenda"
        as="textarea"
        placeholder="Enter agenda"
        register={register({required:true})}
      />
      {/* LIST OF EMPLOYEES */}
      <Form.Group as={Row}>
        <Form.Label column sm="3">Add employees*</Form.Label>
        <Col>
          <Typeahead
            id="basic-typeahead-single"
            name="employees"
            labelKey={e => `${e.first_name} ${e.last_name} [${e.id}]`}
            multiple
            onChange={addAttendees}
            options={employees}
            placeholder="Choose an employees..."
            selected={attendees}
          />
        </Col>
      </Form.Group>
      {/* ALERTS */}
      {notification &&
        <CustomAlert notification={notification}/>
      }
      {/* SAVE | SEND BUTTONS */}
      <div onClick={handleSubmit(onSubmit)} className="pt-1 btn-block text-right">
        <Button id="save" type="submit" className="mr-1">Save</Button>
        <Button id="send" type="submit" variant="danger">Send</Button>
      </div>
    </Form>
  )
}

export default TrainingForm;
