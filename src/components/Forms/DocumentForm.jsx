import React, {useEffect, useState} from "react";
import {Form, Row, Col, Button} from "react-bootstrap";
import {useForm} from "react-hook-form";
import MyHookForm from "./MyHookForm";
import Combinations from "../Others/Combinations";
import {ErrorAlert} from "../Others/ErrorAlert";
import {doc_form, types as t} from "../../helpers/data";
import {getSelectOptions} from "../../helpers/functions";
import {SuccessAlert} from "../Others/SuccessAlert";

const DocumentForm = ({formData, handleDatabase}) => {
  console.log('form_data', formData)
  const {register, handleSubmit, errors, reset} = useForm({
    // defaultValues: {...formData, deadline: 14}
    defaultValues: {...doc_form} // test data
  });

  const types = t // TODO define as array [asi z DB]
  const [error, setError] = useState()
  const [successMessage, setSuccessMessage] = useState()
  const [combinations, setCombinations] = useState([])
  const [emptyCombinations, setEmptyCombinations] = useState([true])
  useEffect(() => setError(""), emptyCombinations)

  const onSubmit = (data, event) => {
    // if (emptyCombinations[0] || combinations.length === 0){
    //   setError("At least one combination is required")
    //   return
    // }

    data = {...data, assigned_to: resolveCombinations()}
    console.log('data', JSON.stringify(data));

    const action = event.target.id
    // const result = handleDatabase('/document', data, action)
    const result = false

    fetch('/document/create', {
      method: "POST",
      body: JSON.stringify(data),
    })
      // .then(response => response.json())
      .then(res => {
        console.log('res', res)
      })
      .catch((e) => console.log('error', e))

    if (result) { // if successful TODO
      setSuccessMessage(`${action} was successful`)
      reset({})
    } else {
      setError(`${action} failed`)
    }
  }

  const resolveCombinations = () => {
    let combs = flatBranch()
    combs = flatDivision(combs)
    combs = flatDepartment(combs)
    combs = flatCity(combs)
    return stringify(combs).join('&')
  }

  const getID = (field) => field.length ? field[0].value : '.'

  const stringify = (combs) => {
    return combs.map(c => {
      return `${getID(c.branch)},${getID(c.city)},${getID(c.department)},${getID(c.division)}`
    })
  }
  const flatBranch = () => {
    const res = []
    combinations.forEach(c => {
      if (!c.branch.length) res.push(c)
      c.branch.forEach(b => res.push({...c, branch: [b]}))
    })
    return res
  }
  const flatDivision = (combs) => {
    const res = []
    combs.forEach(c => {
      if (!c.division.length) res.push(c)
      c.division.forEach(f => res.push({...c, division: [f]}))
    })
    return res
  }
  const flatDepartment = (combs) => {
    const res = []
    combs.forEach(c => {
      if (!c.department.length) res.push(c)
      c.department.forEach(f => res.push({...c, department: [f]}))
    })
    return res
  }
  const flatCity = (combs) => {
    const res = []
    combs.forEach(c => {
      if (!c.city.length) res.push(c)
      c.city.forEach(f => res.push({...c, city: [f]}))
    })
    return res
  }

  return (
    <Form onChange={()=>setSuccessMessage("")}>
       {/* TYPE OF DOCUMENT */}
      <Form.Group as={Row}>
        <Form.Label column sm="2">Type*</Form.Label>
        <Col>
          <Form.Control as="select" name="type" ref={register({validate: v => v !== ""})}>
            {getSelectOptions(types)}
          </Form.Control>
        </Col>
      </Form.Group>
      {/* REQUIRE SUPERIOR */}
      <Form.Group as={Row}>
        <Form.Label column sm="2"> </Form.Label>
        <Col>
          <Form.Check
            inline
            label="require superior"
            name="require_superior"
            ref={register}
            checked={formData !== null && formData.require_superior}
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
      {/*/!* RELEASE *!/*/}
      {/*<MyHookForm*/}
      {/*  label="Release date*"*/}
      {/*  name="release_date"*/}
      {/*  type="date"*/}
      {/*  register={register({required:true})}*/}
      {/*/>*/}
      {/*/!* DEADLINE *!/*/}
      {/*<MyHookForm*/}
      {/*  label="Days to deadline*"*/}
      {/*  name="deadline"*/}
      {/*  type="date"*/}
      {/*  defaultValue="14"*/}
      {/*  register={register({required:true})}*/}
      {/*/>*/}
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
        setCombinations={setCombinations}
        setEmptyCombinations={setEmptyCombinations}
      />

      {/* ALERTS */}
      { error && <ErrorAlert text={error}/> }
      { Object.keys(errors).length ? <ErrorAlert text={"Fill all the require fields"}/> : null}
      { successMessage && <SuccessAlert text={successMessage}/> }

      {/* SAVE | SEND BUTTONS */}
      <div onClick={handleSubmit(onSubmit)} className="pt-1 btn-block text-right">
        <Button id="save" type="submit" className="mr-1">Save</Button>
        <Button id="send" type="submit" variant="danger">Send</Button>
        {/*{formData !== undefined && formData.editable &&*/}
        {/*  <Button id="sendNewVersion" type="submit" variant="danger">Send as new version</Button>*/}
        {/*}*/}
      </div>
    </Form>
  )
}

export default DocumentForm;
