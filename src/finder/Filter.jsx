import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import Select from 'react-select'
import {emptyCombination, setOf} from "../utils/functions";

const Filter = ({showSM, setShowSM, cs, em, es, matrixByFilter, matrixBySuperior, searchByEmployee, searchByCombination}) => {

  const [filter, setFilter] = useState({
    branches: [],
    cities: [],
    departments: [],
    divisions: [],
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
    if (emptyCombination(filter)) {
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

  const handleCombination = () => {
    console.log(filter)
    const res = {
      branch: filter.branches.map(v => v.value).join(','),
      city: filter.cities.map(v => v.value).join(','),
      department: filter.departments.map(v => v.value).join(','),
      division: filter.divisions.map(v => v.value).join(',')
    }
    // const r = resolveCombinations([filter])
    searchByCombination(res)
  }

  const handleEmployee = (data) => {
    searchByEmployee(data)
  }

  const handleToggleSearch = () => {
    if (!showSM) {
      // if (e && filter.find(f => f.length))
      if (em) {
        matrixBySuperior(em)
      } else {
        const res = {
          branch: "",
          city: filter.cities.map(v => v.value).join(','),
          department: filter.departments.map(v => v.value).join(','),
          division: ""
        }
        matrixByFilter(res)
      }
    }
    setShowSM(!showSM)
  }

  const selector = (name, label, options) => (
    <Col>
      <Select
        isMulti
        name={name}
        placeholder={label}
        options={options}
        onChange={
          (data, e) => handleSelect(data, e)
        }
      />
    </Col>
  )

  return (
    <Form>
      <Row className='pb-2'>
        <Col>
          <Select
            defaultValue={em}
            name={"employeeName"}
            placeholder={"Employee Name"}
            options={es}
            onChange={handleEmployee}
          />
        </Col>
        { selector("branches", "branches", branches) }
        { selector("divisions", "Divisions", divisions) }
        { selector("departments","departments", departments) }
        { selector("cities","Cities", cities) }
        {/*{ selector("record","Record", records) }*/}
        <Button className="mr-1" onClick={handleCombination}>
          Search
        </Button>
      </Row>
      <Row>
        {/*<Col/>*/}
        {/* BUTTONS */}
          <Button
            className='ml-3'
            // disabled={
            //   e === undefined &&
            //   filter.branches.length !== 0 ||
            //   filter.divisions.length !== 0 ||
            // ( filter.cities.length === 0 && filter.departments.length === 0)
            // }
            onClick={handleToggleSearch}
          >
            {`Show ${showSM ? 'table' : 'skillMatrix'}`}
          </Button>
          {/* TODO <Button onClick={export}>Export</Button */ }
      </Row>
    </Form>
  )
}

export default Filter;

