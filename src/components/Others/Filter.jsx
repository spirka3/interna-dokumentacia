import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {combinations as combi} from "../../helpers/data";
import Select from 'react-select'
import {setOf} from "../../helpers/functions";

const Filter = () => {

  const [select, setSelect] = useState()
  const [toggle, setToggle] = useState([false])

  const [types, setTypes] = useState(setOf(combi.map(c => c.type)));
  const [cities, setCities] = useState(setOf(combi.map(c => c.city)));
  const [branches, setBranches] = useState(setOf(combi.map(c => c.branch)));

  const [filter, setFilter] = useState({
    type: [],
    branch: [],
    city: []
  });

  const isEmptyFilter = () => {
    return !filter.type.length && !filter.branch.length && !filter.city.length
  }

  useEffect(() => {
    // TODO load combination
    if (isEmptyFilter()) {
      setSelect('reset')
    }
    updateDropBox(filter, select)
  }, toggle);

  const handleSubmit = () => {
    console.log('handleSubmit', filter)
  };

  const handleType = async (data) => {
    setFilter(prev => {
      return {...prev, type: data}
    })
    commitChanges('type')
  };

  const handleBranch = (data) => {
    setFilter(prev => {
      return {...prev, branch: data}
    })
    commitChanges('branch')
  }

  const handleCity = (data) => {
    setFilter(prev => {
      return {...prev, city: data}
    })
    commitChanges('city')
  }

  const commitChanges = (select) => {
    setSelect(select)
    setToggle([!toggle[0]])
  }

  const updateDropBox = (data, select) => {
    let update = combi
    let values = []

    // types
    values = data.type.map(d => d.value)
    if (values.length) {
      update = update.filter(c => values.includes(c.type.value))
    } else {
      setT(update)
      console.log("any types")
    }

    // branches
    values = filter.branch.map(d => d.value)
    if (values.length) {
      update = update.filter(c => values.includes(c.branch.value))
    } else {
      setB(update)
      console.log("any branches")
    }

    // cities
    values = filter.city.map(d => d.value)
    if (values.length) {
      update = update.filter(c => values.includes(c.city.value))
    } else {
      setC(update)
      console.log("any cities")
    }

    if (select !== 'type') setT(update)
    if (select !== 'branch') setB(update)
    if (select !== 'city') setC(update)
  }

  function setT(combinations) {
    setTypes(setOf(combinations.map(c => c.type)))
  }

  function setB(combinations) {
    setBranches(setOf(combinations.map(c => c.branch)));
  }

  function setC(combinations) {
    setCities(setOf(combinations.map(c => c.city)));
  }

  return (
    <Form>
      {/* className="pt-3 pb-3 pr-0 d-flex justify-content-md-center float-right" */}
      <Row>
        <Col>
          <Select isMulti={true} placeholder="Select types" options={types} onChange={handleType} />
        </Col>
        <Col>
          <Select isMulti={true} placeholder="Select branches" options={branches} onChange={handleBranch} />
        </Col>
        <Col>
          <Select isMulti={true} placeholder="Select cities" options={cities} onChange={handleCity} />
        </Col>
        <Col>
          <Form.Group as={Col} className={"align-items-end"}>
            <Button onClick={handleSubmit}>Search</Button>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )
}

export default Filter;

