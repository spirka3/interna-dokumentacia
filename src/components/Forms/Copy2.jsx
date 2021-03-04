import React, {useEffect, useState} from "react";
import {Col, Form, Modal, Row} from "react-bootstrap";
import Select from "react-select";
import {isValidCombination, setOf} from "../../helpers/functions";
import {combinations, comboFields} from "../../helpers/data";
import {CustomAlert} from "../Others/CustomAlert";
import {Typeahead} from "react-bootstrap-typeahead";

const CombinationForm = ({showEmployees, combination, setCombination, notification, setNotification}) => {

  let combi = combinations

  const [select, setSelect] = useState()
  const [toggle, setToggle] = useState([false])

  const [branches, setBranches] = useState(setOf(combi.map(c => c.branch)));
  const [divisions, setDivisions] = useState(setOf(combi.map(c => c.division)));
  const [departments, setDepartments] = useState(setOf(combi.map(c => c.department)));
  const [cities, setCities] = useState(setOf(combi.map(c => c.city)));
  const [removedEmployees, setRemovedEmployees] = useState([
    {value: 'ja', label: 'Ja'},
    {value: 'ty', label: 'Ty'},
    {value: 'on', label: 'On'}
  ])

  const handleSelect = (data, event) => {
    const field = event.name
    setCombination({...combination, [field]: data})
    commitChanges(field)
  }

  const commitChanges = (select) => {
    setSelect(select)
    setToggle([!toggle[0]])
    setNotification(undefined)
  }

  useEffect(() => {
    if (!isValidCombination(combination)) {
      setSelect('reset')
    }
    updateDropBox()
  }, [toggle]);

  const updateDropBox = () => {
    let update = combi

    // start of inner functions
    Object.keys(combination).forEach(field => {
      const values = update[field].map(d => d.value)
      if (values.length) {
        update = update.filter(c => values.includes(c[field].value))
      } else {
        update = combi
        Object.keys(combination).forEach(field => {
          const values = combination[field].map(d => d.value)
          if (values.length) {
            update = update.filter(c => values.includes(c[field].value))
          }
        })
        if (select !== 'branch') setBranch()
        if (select !== 'division') setDivision()
        if (select !== 'department') setDepartment()
        if (select !== 'city') setCity()
      }
    })

    function getSetOf(field) {
      return setOf(update.map(c => c[field]))
    }

    function setBranch() {setBranches(getSetOf('branch'))}
    function setDivision() {setDivisions(getSetOf('division'))}
    function setDepartment() {setDepartments(getSetOf('department'))}
    function setCity() {setCities(getSetOf('city'))}

    if (select !== 'branch') setBranch()
    if (select !== 'division') setDivision()
    if (select !== 'department') setDepartment()
    if (select !== 'city') setCity()
  }

  const selector = (name, label, options) => {
    return (
      <>
        {label}
        <Select
          isMulti={true}
          name={name}
          options={options}
          placeholder={label}
          onChange={(data, e) => handleSelect(data, e)}
        />
        <br/>
      </>
    )
  }

  return (
    <Col className="p-0">
      { selector("branch", "Branches", branches) }
      { selector("division", "Divisions", divisions) }
      { selector("department","Departments", departments) }
      { selector("city","Cities", cities) }
      {showEmployees &&
        selector("removedEmployees", "Remove employees", removedEmployees) }
      {notification &&
        <CustomAlert notification={notification}/>
      }
    </Col>
  )
}

export default CombinationForm;