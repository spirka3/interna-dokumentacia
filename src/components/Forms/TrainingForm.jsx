import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import MyHookForm from "./MyHookForm";
import {Row, Col, Form, Button} from "react-bootstrap";
import {Typeahead} from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {dbdocs, employees} from "../../helpers/data";
import {get_current_date} from "../../helpers/functions";
import {ErrorAlert} from "../Others/ErrorAlert";
import {SuccessAlert} from "../Others/SuccessAlert";

const TrainingForm = ({formData, handleDatabase}) => {
  console.log('form_data', formData)
  // let employees = ...
  useEffect(()=>{
    // TODO MATO load employees
  },[]) // Only once

  const {register, handleSubmit, errors, reset} = useForm({
    // defaultValues: {...dbdocs[1], date: get_current_date(), employees: employees[0]} // test data
    defaultValues: {...formData, date: get_current_date()}
  });

  const [errorMsg, setErrorMsg] = useState()
  const [successMsg, setSuccessMsg] = useState()
  const [attendees, setAttendees] = useState([])
  const [emptyAttendees, setEmptyAttendees] = useState([true])
  useEffect(() => setErrorMsg(""), emptyAttendees)

  const onSubmit = (data, event) => {
    if (emptyAttendees[0] || attendees.length === 0){
      setErrorMsg("At least one employee is required")
      return
    }

    data = {...data, employees: attendees} // TODO poslat správne zamestnancov do DB
    console.log('data', data);

    const action = event.target.id
    const result = handleDatabase('/document', data, action)

    if (result) { // if successful TODO
      setSuccessMsg(`${action} was successful`)
      reset({})
    } else {
      setErrorMsg(`${action} failed`)
    }
  }

  const addAttendees = (attendee) => {
    setAttendees(attendee)
    setEmptyAttendees([false])
  }

  return (
    <Form onChange={()=>setSuccessMsg("")}>
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
        register={register({required:true, valueAsDate: true})}
      />
      {/* DURATION */}
      <MyHookForm
        label="Duration"
        name="duration"
        type="number"
        placeholder="Enter duration"
        register={register}
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
        <Form.Label column sm="2">Add employees*</Form.Label>
        <Col>
          <Typeahead
            id="basic-typeahead-single"
            name="employees"
            labelKey={option => `${option.name} [${option.anet_id}]`}
            multiple
            onChange={addAttendees}
            options={employees}
            placeholder="Choose an employees..."
            selected={attendees}
          />
        </Col>
      </Form.Group>

      {/* ALERTS */}
      { Object.keys(errors).length ? <ErrorAlert text={"Fill all the require fields"}/> : null}
      { errorMsg && <ErrorAlert text={errorMsg}/> }
      { successMsg && <SuccessAlert text={successMsg}/> }

      {/* SAVE | SEND BUTTONS */}
      <div onClick={handleSubmit(onSubmit)} className="pt-1 btn-block text-right">
        <Button id="save" type="submit" className="mr-1">Save</Button>
        <Button id="send" type="submit" variant="danger">Send</Button>
      </div>
    </Form>
  )
}

export default TrainingForm;
