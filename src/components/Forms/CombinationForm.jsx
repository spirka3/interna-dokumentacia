import React, {useEffect, useState} from "react";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import { emptyCombination, setOf } from "../../utils/functions";
import {CustomAlert} from "../CustomAlert";

const CombinationForm = ({prefill, disabled, setDisabled, employees, combinations: cs, combination, setCombination, notification, setNotification}) => {

  const [select, setSelect] = useState()
  const [toggle, setToggle] = useState([false])

  const [branches, setBranches] = useState(setOf(cs.map(c => c.branch)))
  const [divisions, setDivisions] = useState(setOf(cs.map(c => c.division)))
  const [departments, setDepartments] = useState(setOf(cs.map(c => c.department)))
  const [cities, setCities] = useState(setOf(cs.map(c => c.city)))

  const handleSelect = (data, {name: field}) => {
    setCombination({...combination, [field]: data})
    if (field !== 'removedEmployees'){
      commitChanges(field)
    }
  }

  const commitChanges = (select) => {
    const _disabled = ['branches']
    if (select === 'divisions') {
      setDisabled([...disabled, ..._disabled])
    }
    _disabled.push('divisions')
    if (select === 'departments') {
      setDisabled([...disabled, ..._disabled])
    }
    _disabled.push('departments')
    if (select === 'cities') {
      setDisabled([...disabled, ..._disabled])
    }
    _disabled.push('cities')
    if (select === 'removedEmployees') {
      setDisabled([...disabled, ..._disabled])
    }

    setSelect(select)
    setToggle([!toggle[0]])
    setNotification(undefined)
  }

  useEffect(() => {
    if (!emptyCombination(combination)) {
      setSelect('reset')
    }
    updateDropBox()
  }, [toggle])

  const updateDropBox = () => {
    let update = cs

    // start of inner functions
    function updateField(field) {
      const values = combination[field].map(d => d.value)
      if (values.length) {
        const _field = getSingularFieldName(field)
        update = update.filter(c => values.includes(c[_field].value))
      }
      return values.length
    }

    function getSingularFieldName(field){
      switch (field) {
        case 'branches': return 'branch'
        case 'divisions': return 'division'
        case 'departments': return 'department'
        case 'cities': return 'city'
      }
    }

    const getSetOf = field => setOf(update.map(c => c[field]))

    function setBranch() {setBranches(getSetOf('branch'))}
    function setDivision() {setDivisions(getSetOf('division'))}
    function setDepartment() {setDepartments(getSetOf('department'))}
    function setCity() {setCities(getSetOf('city'))}
    // end of inner functions

    if (!updateField('branches')) setBranch()
    if (!updateField('divisions')) setDivision()
    if (!updateField('departments')) setDepartment()
    if (!updateField('cities')) setCity()

    if (select !== 'branches') setBranch()
    if (select !== 'divisions') setDivision()
    if (select !== 'departments') setDepartment()
    if (select !== 'cities') setCity()
  }

  const selector = (name, label, options) => (
    <>
      {label}
      <Select
        isMulti={true}
        placeholder=''
        name={name}
        options={options}
        defaultValue={
          prefill ? prefill[name] : []
        }
        isDisabled={
          prefill && name !== 'removedEmployees'
          || disabled.includes(name)
        }
        onChange={
          (data, e) => handleSelect(data, e)
        }
      />
      <br/>
    </>
  )

  return (
    <Col className="p-0">
      { selector("branches", "branches", branches) }
      { selector("divisions", "divisions", divisions) }
      { selector("departments","departments", departments) }
      { selector("cities","Cities", cities) }
      { employees && selector("removedEmployees", "Remove employees", employees) }
      { notification && <CustomAlert notification={notification}/> }
    </Col>
  )
}

export default CombinationForm;
