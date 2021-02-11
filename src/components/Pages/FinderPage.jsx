import React, {useState} from "react";
import {Button, Col, Form} from "react-bootstrap";
import Filter from "../Others/Filter";
import FoundRecords from "../Tables/FoundRecords";
import SkillMatrixPage from "./SkillMatrixPage";

const FinderPage = () => {

  const [toggle, setToggle] = useState(true)
  const [filter, setFilter] = useState({
    type: [],
    branch: [],
    city: [],
    department: [],
    division: [],
    record: [],
    employeeName: '',
    recordName: ''
  });

  return (
    <div style={{marginTop: '1%'}} className="finder">
      <Filter filter={filter} setFilter={setFilter}/>
      {toggle ? <FoundRecords filter={filter}/> : <SkillMatrixPage filter={filter}/> }
      {/* TODO PATO export */}
      <Button className="mr-1" size="sm">Export</Button>
      <Button onClick={()=>setToggle(!toggle)} size="sm">{`Show ${toggle ? 'skillMatrix' : 'table'}`}</Button>
      {/*<Button>Reset Filter</Button>*/}
    </div>
  )
}

export default FinderPage;
