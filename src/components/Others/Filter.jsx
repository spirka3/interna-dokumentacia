import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {combinations, employees as e, records, types2} from "../../helpers/data";
import Select from 'react-select'
import {
  getEmployeesNames,
  isValidCombination,
  prepareCombinations,
  resolveCombinations,
  setOf
} from "../../helpers/functions";

const Filter = ({showSM, setShowSM, cs, e, found, handleSearch}) => {

  const [filter, setFilter] = useState({
    // type: [], record: [],
    branch: [], city: [],
    department: [], division: [],
    // employeeName: '', superiorName: '',
    // recordName: ''
  });

  const [select, setSelect] = useState()
  const [toggle, setToggle] = useState([false])

  const [branches, setBranches] = useState(setOf(cs.map(c => c.branch)));
  const [divisions, setDivisions] = useState(setOf(cs.map(c => c.division)));
  const [departments, setDepartments] = useState(setOf(cs.map(c => c.department)));
  const [cities, setCities] = useState(setOf(cs.map(c => c.city)));

  const handleSelect = (data, event) => {
    const field = event.name
    setFilter({...filter, [field]: data})
    if (field !== 'removedEmployees'){
      commitChanges(field)
    }
  }

  const commitChanges = (select) => {
    setSelect(select)
    setToggle([!toggle[0]])
  }

  useEffect(() => {
    if (!isValidCombination(filter)) {
      setSelect('reset')
    }
    updateDropBox()
  }, [toggle]);

  const updateDropBox = () => {
    let update = cs

    // start of inner functions
    function updateField(field) {
      const values = filter[field].map(d => d.value)
      if (values.length) {
        update = update.filter(c => values.includes(c[field].value))
      }
      return values.length
    }

    const getSetOf = field => setOf(update.map(c => c[field]))

    function setBranch() {setBranches(getSetOf('branch'))}
    function setDivision() {setDivisions(getSetOf('division'))}
    function setDepartment() {setDepartments(getSetOf('department'))}
    function setCity() {setCities(getSetOf('city'))}
    // end of inner functions

    if (!updateField('branch')) setBranch()
    if (!updateField('division')) setDivision()
    if (!updateField('department')) setDepartment()
    if (!updateField('city')) setCity()

    if (select !== 'branch') setBranch()
    if (select !== 'division') setDivision()
    if (select !== 'department') setDepartment()
    if (select !== 'city') setCity()
  }

  const search = () => {
    console.log(filter)
    const res = {
      branch: filter.branch.map(v => v.value).join(','),
      city: filter.city.map(v => v.value).join(','),
      department: filter.department.map(v => v.value).join(','),
      division: filter.division.map(v => v.value).join(',')
    }
    // const r = resolveCombinations([filter])
    handleSearch(res)
  }

  const selector = (name, label, options) => {
    return (
      <Col>
        <Select
          isMulti={true}
          name={name}
          placeholder={label}
          options={options}
          onChange={(data, e) => handleSelect(data, e)}
        />
      </Col>
    )
  }

  return (
    <Form className="pb-4">
      <Row className='pb-2'>
        { selector("type", "Types", types2) }
        { selector("branch", "Branches", branches) }
        { selector("division", "Divisions", divisions) }
        { selector("department","Departments", departments) }
        { selector("city","Cities", cities) }
        { selector("record","Record", records) }
      </Row>
      <Row>
        { selector("employeeName", "Employee Name", e) }
        { selector("superiorName", "Superior Name", e) }

        {/* BUTTONS */}
        <Col className="text-right">
          <Button className="mr-1" onClick={search}>
            Search
          </Button>
          <Button className="mr-1"
            disabled={!found.length}
            onClick={() => setShowSM(!showSM)}
          >
            {`Show ${showSM ? 'table' : 'skillMatrix'}`}
          </Button>
          <Button disabled={!found.length}>
            Export
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Filter;

