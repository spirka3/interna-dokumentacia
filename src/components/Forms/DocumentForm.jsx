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
    if (emptyCombinations[0] || combinations.length === 0){
      setError("At least one combination is required")
      return
    }

    data = {...data, combinations: resolveCombinations()}
    console.log('data', data);

    const action = event.target.id
    const result = handleDatabase('/document', data, action)

    if (result) { // if successful TODO
      setSuccessMessage(`${action} was successful`)
      reset({})
    } else {
      setError(`${action} failed`)
    }
  }

  const resolveCombinations = () => {
    console.log('combinations', combinations);
    let combs = flatBranch()
    combs = flatDivision(combs)
    combs = flatDepartment(combs)
    combs = flatCity(combs)
    const res = stringify(combs)
    console.log('res', res.join('&'))
    return res
    // TODO ME poslat správne kombinacie do DB
  }

  const stringify = (combs) => {
    const res = []
    let str = ''
    combs.forEach(c => {
      str = `${c.branch.length ? c.branch[0].value : '.'},${c.city.length ? c.city[0].value : '.'},${c.department.length ? c.department[0].value : '.'},${c.division.length ? c.division[0].value : '.'}`
      console.log('str', str)
      res.push(str)
    })
    return res
  }

  const flatBranch = () => {
    const res = []
    combinations.forEach(c => {
      c.branch.forEach(b => {
        res.push({...c, branch: [b]})
      })
    })
    return res
  }

  const flatDivision = (combs) => {
    const res = []
    combs.forEach(c => {
      c.division.forEach(f => {
        res.push({...c, division: [f]})
      })
    })
    return res
  }

  const flatDepartment = (combs) => {
    const res = []
    combs.forEach(c => {
      c.department.forEach(f => {
        res.push({...c, department: [f]})
      })
    })
    return res
  }

  const flatCity = (combs) => {
    const res = []
    combs.forEach(c => {
      c.city.forEach(f => {
        res.push({...c, city: [f]})
      })
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
        <Form.Label column sm="2">Require superior*</Form.Label>
        <Col>
          <Form.Check
            type="radio"
            label="yes"
            value={true}
            inline
            name="require_superior"
            ref={register}
          />
          <Form.Check
            type="radio"
            label="no"
            value={false}
            name="require_superior"
            inline
            defaultChecked
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
        name="release"
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
        register={register({required:true})}
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
