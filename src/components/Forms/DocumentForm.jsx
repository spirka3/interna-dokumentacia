import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import MyHookForm from "./MyHookForm";
import {Form, Row, Col, Button} from "react-bootstrap";
import Combinations from "../Tables/Combinations";
import {CustomAlert} from "../Others/CustomAlert";
import {doc_form, types as t} from "../../helpers/data";
import {
  badMsg,
  goodMsg,
  correctDocumentFormData,
  getSelectOptions,
  prefillDocumentForm,
  successResponse, getCombinationsNames, prepareCombinations
} from "../../helpers/functions";

const DocumentForm = ({formData, actual}) => {
  const {register, handleSubmit} = useForm({
    // defaultValues: prefillDocumentForm(doc_form)
    defaultValues: prefillDocumentForm(formData)
  });

  const types = t;
  const [notification, setNotification] = useState()
  const [combinations, setCombinations] = useState([])
  const [assignedTo, setAssignedTo] = useState([])
  const [emptyAssign, setEmptyAssign] = useState([true])
  useEffect(() => setNotification(undefined), emptyAssign)

  useEffect(() => {
    fetch('/combination', {
      method: "GET",
    })
      .then(response => response.json())
      .then(res => {
        const combs = prepareCombinations(res)
        setCombinations(combs)
        const assign = getCombinationsNames(formData, combs)
        console.log('assign', assign)
        setAssignedTo(assign)
      })
      .catch((e) => console.log(e))
  },[])

  const onSubmit = (data, event) => {
    if (emptyAssign[0] || assignedTo.length === 0){
      setNotification(badMsg("At least one combination is required"))
      return
    }

    data = correctDocumentFormData(data, assignedTo)
    console.log('FormData', data)
    const action = event.target.id

    if (action === "save")
      if (formData) {
        data = {...data, id: formData.id}
        upsert(data, 'update')
      } else {
        upsert(data, 'create') // TODO ME po uspesnom by sa malo pridat do data id
      }
    if (action === "send"){
      if (formData) {
        data = {...data, id: formData.id}
        if (actual) {
          upsertConfirm(data, 'create/confirm')
        } else {
          upsertConfirm(data, 'update/confirm')
        }
      } else {
        upsertConfirm(data, 'create/confirm')
      }
    }
  }

  const upsert = (data, action) => {
    fetch(`/document/${action}`, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => {
        if (successResponse(res)) {
          setNotification(goodMsg(`${action} was successful`))
        } else {
          setNotification(badMsg(`${action} failed`))
        }
        console.log('res', res.body)
        return res.json()
      })
      .then((r) => console.log('r', r))
      .catch((e) => console.log('error', e))
  }

  const upsertConfirm = (data, action) => {
    fetch(`/document/${action}`, {
      method: "POST",
      body: JSON.stringify(data)
    }).then(res => {
      if (successResponse(res)) {
        setNotification(goodMsg(`${action} was successful`))
      } else {
        setNotification(badMsg(`${action} failed`))
      }
    }).catch((e) => console.log('error', e))
  }

  const getType = () => 'B'
  // const getType = () => formData ? formData.type : ''

  return (
    <Form
      onChange={()=>setNotification(undefined)}

    >
      <Form.Group as={Row}>
        <Form.Label column sm="3">Type*</Form.Label>
        <Col>
          <Form.Control
            as="select"
            name="type"
            value={getType()}
            ref={register({validate: v => v !== ""})}
          >
            {getSelectOptions(types)}
          </Form.Control>
        </Col>
      </Form.Group>
      {/* REQUIRE SUPERIOR */}
      <Form.Group as={Row}>
        <Form.Label column sm="3"> </Form.Label>
        <Col>
          <Form.Check
            inline
            label="require superior"
            name="require_superior"
            ref={register}
          />
        </Col>
      </Form.Group>
      {/* NAME */}
      <MyHookForm
        label="Document name*"
        name="name"
        placeholder="Enter document name"
        register={register({required:true})}
        required={true}
      />
      {/* LINK */}
      <MyHookForm
        label="Link to sharepoint"
        name="link"
        placeholder="Enter document link to sharepoint"
        register={register}
      />
      {/* RELEASE */}
      <MyHookForm
        label="Release date*"
        name="release_date"
        type="date"
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
      {/* VERSION */}
      <MyHookForm
        label="Version*"
        name="version"
        placeholder="Enter version"
        register={register({required:true})}
      />
      {/* ORDER NUMBER */}
      <MyHookForm
        label="Order number*"
        name="order_number"
        type="number"
        placeholder="Enter number"
        register={register({required:true, valueAsNumber: true})}
      />
      {/* NOTE */}
      <MyHookForm
        label="Note"
        name="note"
        as="textarea"
        placeholder="Enter note"
        register={register}
      />
      {/* COMBINATIONS */}
      <Combinations
        combinations={combinations}
        assignedTo={assignedTo}
        setAssignedTo={setAssignedTo}
        setEmptyAssign={setEmptyAssign}
      />
      {/* ALERTS */}
      {notification &&
        <CustomAlert notification={notification}/>
      }
      {/* SAVE | SEND BUTTONS */}
      <div onClick={handleSubmit(onSubmit)} className="pt-1 btn-block text-right">
        <Button id="save" type="submit" className="mr-1">Save</Button>
        <Button id="send" type="submit" variant="danger">{actual ? 'Send as new version' : 'Send'}</Button>
      </div>
    </Form>
  )
}

export default DocumentForm;
