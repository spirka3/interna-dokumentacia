import React, {useEffect, useState} from "react";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import {badMsg, goodMsg, isValidCombination, setOf, successResponse} from "../../helpers/functions";
import {combinations, comboFields} from "../../helpers/data";
import {CustomAlert} from "../Others/CustomAlert";

const CombinationForm = ({prefill, employees, combinations: cc, combination, setCombination, notification, setNotification}) => {

  let combi = combinations

  const [select, setSelect] = useState()
  const [toggle, setToggle] = useState([false])

  const [branches, setBranches] = useState(setOf(combi.map(c => c.branch)))
  const [divisions, setDivisions] = useState(setOf(combi.map(c => c.division)))
  const [departments, setDepartments] = useState(setOf(combi.map(c => c.department)))
  const [cities, setCities] = useState(setOf(combi.map(c => c.city)))

  const handleSelect = (data, event) => {
    const field = event.name
    setCombination({...combination, [field]: data})
    if (field !== 'removedEmployees'){
      commitChanges(field)
    }
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
    function updateField(i) {
      const fields = Object.keys(combination)
      const field = fields[i]
      if (i > 0){
        const prevField = fields[i-1]
        console.log('--> skipped', field)
        console.log('--> prev', combination[prevField])
        if (!combination[prevField].length) return true
      }
      console.log(field)
      const values = combination[field].map(d => d.value)
      if (values.length) {
        update = update.filter(c => values.includes(c[field].value))
      } else {
        // FIX
        update = combi
        for (let i = 0; i < fields.length; i++){
          const field = fields[i]
          if (field === 'id') continue
          if (i > 0){
            const prevField = fields[i-1]
            if (!combination[prevField].length) continue
          }
          const values = combination[field].map(d => d.value)
          if (values.length) {
            update = update.filter(c => values.includes(c[field].value))
          }
        }
      }
      console.log('----------')
      return values.length
    }

    const getSetOf = field => setOf(update.map(c => c[field]))

    function setBranch() {setBranches(getSetOf('branch'))}
    function setDivision() {setDivisions(getSetOf('division'))}
    function setDepartment() {setDepartments(getSetOf('department'))}
    function setCity() {setCities(getSetOf('city'))}
    // end of inner functions

    if (!updateField(0)) setBranch()
    if (!updateField(1)) setDivision()
    if (!updateField(2)) setDepartment()
    if (!updateField(3)) setCity()

    if (select !== 'branch') setBranch()
    if (select !== 'division') setDivision()
    if (select !== 'department') setDepartment()
    if (select !== 'city') setCity()
  }

  const selector = (name, label, options) => {
    const defaultValue = prefill ? prefill[name] : []
    return (
      <>
        {label}
        <Select
          defaultValue={defaultValue}
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
      {employees &&
        selector("removedEmployees", "Remove employees", employees) }
      {notification &&
        <CustomAlert notification={notification}/>
      }
    </Col>
  )
}

export default CombinationForm;
