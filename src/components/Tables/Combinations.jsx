import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {PlusSquare, XSquare, Pencil} from 'react-bootstrap-icons';
import CombinationModal from "../Modals/CombinationModal";
import EmptyTable from "./EmptyTable";
import Button from "react-bootstrap/Button";
import {buttonColumn} from "../../helpers/functions";

const Combinations = ({combinations, assignedTo, setAssignedTo, setEmptyAssign}) => {

  const [showModal, setShowModal] = useState(false)

  const deleteCombination = (row) => {
    setAssignedTo(prevState => {
     return prevState.filter(c => c.id !== row.id)
    })
  };

  const editCombination = (row) => {
    console.log('not implemented')
  };

  const EditIcon = (cell, row) => {
    return <Pencil size="25" color="#f3c404f2" onClick={() => editCombination(row)}/>
  };

  const DeleteIcon = (cell, row) => {
    return <XSquare size="25" color="red" onClick={() => deleteCombination(row)}/>
  };

  const AddIcon = () => {
    return (
      <Button variant="success" onClick={() => setShowModal(true)} size="sm" className="mb-2">
        <strong>Add combination {" "}</strong>
        <PlusSquare size="20" color="white"/>
      </Button>
    )
  };

  const getLabels = (field) => {
    return <>{field.map(f => f.label).join(',')}</>
  }
  const Branch = (_, row) => getLabels(row.branch)
  const Division = (_, row) => getLabels(row.division)
  const Department = (_, row) => getLabels(row.department)
  const City = (_, row) => getLabels(row.city)

  const columns = [{
    dataField: 'branch',
    text: 'Branch',
    formatter: Branch
  }, {
    dataField: 'division',
    text: 'Division',
    formatter: Division
  }, {
    dataField: 'department',
    text: 'Department',
    formatter: Department
  }, {
    dataField: 'city',
    text: 'City',
    formatter: City
  }, {
    ...buttonColumn('edit'),
    formatter: EditIcon
  }, {
    ...buttonColumn('del'),
    formatter: DeleteIcon
  }];

  return (
    <>
      <BootstrapTable
        keyField="id"
        data={assignedTo}
        columns={columns}
        bordered={false}
        noDataIndication={EmptyTable}
        // horizontal scroll
        wrapperClasses="table-responsive"
        rowClasses="text-nowrap"
      />
      <AddIcon/>
      {showModal &&
        <CombinationModal
          combinations={combinations}
          setShowModal={setShowModal}
          setAssignedTo={setAssignedTo}
          setEmptyAssign={setEmptyAssign}
        />
      }
    </>
  )
}

export default Combinations;
