import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {Plus, XSquare, Pencil} from 'react-bootstrap-icons';
import CombinationModal from "../Modals/CombinationModal";
import EmptyTable from "./EmptyTable";
import Button from "react-bootstrap/Button";
import {buttonColumn} from "../../helpers/functions";

const Combinations = ({combinations, assignedTo, setAssignedTo, setEmptyAssign}) => {

  const [showModal, setShowModal] = useState(false)
  const [prefill, setPrefill] = useState();

  const openModal = () => setShowModal(true)
  const closeModal = () => {
    setPrefill(undefined)
    setShowModal(false)
  }

  const EditIcon = (_, row) => {
    return <Pencil size="25" color="black" onClick={() => editCombination(row)}/>
  }

  const editCombination = (row) => {
    setPrefill(row)
    openModal()
  }

  const DeleteIcon = (_, row) => {
    return <XSquare size="25" color="red" onClick={() => deleteCombination(row)}/>
  }

  const deleteCombination = (row) => {
    setAssignedTo(prevState => {
      return prevState.filter(c => c.id !== row.id)
    })
  }

  const AddIcon = () => {
    return (
      <Button variant="success" onClick={openModal} size="sm" className="mb-2">
        <Plus size="20" color="white"/>
        <span>add combination</span>
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
        noDataIndication={EmptyTable}
        // horizontal scroll
        wrapperClasses="table-responsive"
        rowClasses="text-nowrap"
      />
      <AddIcon/>
      {showModal &&
        <CombinationModal
          prefill={prefill}
          combinations={combinations}
          setAssignedTo={setAssignedTo}
          setEmptyAssign={setEmptyAssign}
          closeModal={closeModal}
        />
      }
    </>
  )
}

export default Combinations;
