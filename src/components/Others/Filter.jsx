import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {records, types2} from "../../helpers/data";
import Select from 'react-select'
import {emptyCombination, setOf} from "../../helpers/functions";

const Filter = ({showSM, setShowSM, cs, e, found, handleSearch}) => {

  const [filter, setFilter] = useState({
    // type: [], record: [],
    branches: [], cities: [],
    departments: [], divisions: [],
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

  const search = () => {
    console.log(filter)
    const res = {
      branch: filter.branches.map(v => v.value).join(','),
      city: filter.cities.map(v => v.value).join(','),
      department: filter.departments.map(v => v.value).join(','),
      division: filter.divisions.map(v => v.value).join(',')
    }
    // const r = resolveCombinations([filter])
    handleSearch(res)
  }

  const selector = (name, label, options) => (
    <Col>
      <Select
        isMulti={true}
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
    <Form className="pb-4">
      <Row className='pb-2'>
        {/*{ selector("type", "Types", types2) }*/}
        { selector("branches", "branches", branches) }
        { selector("divisions", "Divisions", divisions) }
        { selector("departments","departments", departments) }
        { selector("cities","Cities", cities) }
        {/*{ selector("record","Record", records) }*/}
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

