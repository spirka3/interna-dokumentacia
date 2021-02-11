import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {PlusSquare, XSquare} from 'react-bootstrap-icons';
import CombinationModal from "../Modals/CombinationModal";
import EmptyTable from "../Tables/EmptyTable";
import Button from "react-bootstrap/Button";
import {fitBtn} from "../../helpers/functions";

const Combinations = ({combinations, setCombinations, setReq}) => {

  const [showModal, setShowModal] = useState(false)

  console.log('combinations', combinations)

  const deleteCombination = (c) => {
    setCombinations(combinations.filter(c2 => c2.id !== c.id)); // delete the combination
  };

  const DeleteIcon = (cell, c) => {
    return (
      <XSquare size="25" color="red" onClick={() => deleteCombination(c)}/>
    )
  };

  const AddIcon = () => {
    return (
      <Button variant="success" onClick={() => setShowModal(true)} size="sm">
        <strong>Add combination {" "}</strong>
        <PlusSquare size="20" color="white"/>
      </Button>
    )
  };

  const Branch = (col, row) => <>{row.branch.map(r=>r.value).join(',')}</>
  const Division = (col, row) => <>{row.division.map(r=>r.value).join(',')}</>
  const Department = (col, row) => <>{row.department.map(r=>r.value).join(',')}</>
  const City = (col, row) => <>{row.city.map(r=>r.value).join(',')}</>

  const columns = [{
    dataField: 'c.branch',
    text: 'Branch',
    formatter: Branch
  }, {
    dataField: 'c.division',
    text: 'Division',
    formatter: Division
  }, {
    dataField: 'c.department',
    text: 'Department',
    formatter: Department
  }, {
    dataField: 'c.city',
    text: 'City',
    formatter: City
  }, {
    dataField: '',
    text: 'Delete',
    formatter: DeleteIcon,
    headerStyle: fitBtn()
  }];

  return (
    <>
      <hr/>
      <BootstrapTable
        keyField="id"
        data={combinations}
        columns={columns}
        bordered={false}
        noDataIndication={EmptyTable}
      />
      <AddIcon/>
      {showModal &&
        <CombinationModal
          showModal={showModal}
          setShowModal={setShowModal}
          combinations={combinations}
          setCombinations={setCombinations}
          setReq={setReq}
        />
      }
      <hr/>
    </>
  )
}

export default Combinations;
