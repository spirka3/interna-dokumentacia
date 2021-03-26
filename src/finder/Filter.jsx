import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import {
  emptyCombination,
  getSingularFieldName,
  prepareFilter,
  setOf,
} from "../utils/functions";

const Filter = ({
  cs,
  em,
  es,
  showSM,
  setShowSM,
  matrixByFilter,
  matrixBySuperior,
  searchByEmployee,
  searchByCombination,
}) => {
  const [filter, setFilter] = useState({
    branches: [],
    cities: [],
    departments: [],
    divisions: [],
  });
  const [select, setSelect] = useState([]);

  const [branches, setBranches] = useState(setOf(cs.map((c) => c.branch)));
  const [divisions, setDivisions] = useState(setOf(cs.map((c) => c.division)));
  const [departments, setDepartments] = useState(
    setOf(cs.map((c) => c.department))
  );
  const [cities, setCities] = useState(setOf(cs.map((c) => c.city)));

  const handleSelect = (data, event) => {
    const field = event.name;
    setFilter({ ...filter, [field]: data });
    if (field !== "removedEmployees") {
      setSelect([select]);
    }
  };

  useEffect(() => {
    if (emptyCombination(filter) && select[0] !== "reset") {
      setSelect(["reset"]);
    }
    updateDropBox();
  }, [select]);

  const updateDropBox = () => {
    let update = cs;

    // start of inner functions
    function updateField(field) {
      const values = filter[field].map((d) => d.value);
      if (values.length) {
        const _field = getSingularFieldName(field);
        update = update.filter((c) => values.includes(c[_field].value));
      }
      return values.length;
    }

    const getSetOf = (field) => setOf(update.map((c) => c[field]));
    const setBranch = () => setBranches(getSetOf("branch"));
    const setDivision = () => setDivisions(getSetOf("division"));
    const setDepartment = () => setDepartments(getSetOf("department"));
    const setCity = () => setCities(getSetOf("city"));
    // end of inner functions

    if (!updateField("branches")) setBranch();
    if (!updateField("divisions")) setDivision();
    if (!updateField("departments")) setDepartment();
    if (!updateField("cities")) setCity();

    const field = select[0];
    if (field !== "branches") setBranch();
    if (field !== "divisions") setDivision();
    if (field !== "departments") setDepartment();
    if (field !== "cities") setCity();
  };

  const handleCombination = () => {
    searchByCombination(prepareFilter(filter));
  };

  const handleEmployee = (data) => {
    searchByEmployee(data);
  };

  const handleToggleSearch = () => {
    if (!showSM) {
      // if (e && filter.find(f => f.length))
      if (em) {
        matrixBySuperior(em);
      } else {
        const res = {
          branch: "",
          city: filter.cities.map((v) => v.value).join(","),
          department: filter.departments.map((v) => v.value).join(","),
          division: "",
        };
        matrixByFilter(res);
      }
    }
    setShowSM(!showSM);
  };

  const selector = (name, label, options) => (
    <Col>
      <Select
        isMulti
        name={name}
        placeholder={label}
        options={options}
        onChange={(data, e) => handleSelect(data, e)}
      />
    </Col>
  );

  return (
    <Form>
      <Row className="pb-2">
        <Col>
          <Select
            defaultValue={em}
            name="employeeName"
            placeholder="Employee Name"
            options={es}
            onChange={handleEmployee}
          />
        </Col>
        {selector("branches", "branches", branches)}
        {selector("divisions", "Divisions", divisions)}
        {selector("departments", "departments", departments)}
        {selector("cities", "Cities", cities)}
        <Button onClick={handleCombination}>Search</Button>
      </Row>
      <Row>
        <Button
          size="sm"
          className="ml-3"
          // disabled={
          //   e === undefined &&
          //   filter.branches.length !== 0 ||
          //   filter.divisions.length !== 0 ||
          // ( filter.cities.length === 0 && filter.departments.length === 0)
          // }
          onClick={handleToggleSearch}
        >
          {`Show ${showSM ? "table" : "skillMatrix"}`}
        </Button>
        <Button size="sm" className="ml-1" disabled>
          Export
        </Button>
      </Row>
    </Form>
  );
};

export default Filter;
