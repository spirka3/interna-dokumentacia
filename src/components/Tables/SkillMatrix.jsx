import React, {useEffect, useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import {sm_data, employees} from "../../helpers/data";
import ToggleBtn from "../Buttons/ToggleBtn";
import ConfirmModal from "../Modals/ConfirmModal";
import {Legend, RowButtons} from "../Others/SkillMatrixComponents";
import {buttonColumn} from "../../helpers/functions";
import {DocumentLabel, FormattedEmployee} from "../Others/Formatter";

const SkillMatrix = ({found}) => {

  const [showLegend, setShowLegend] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalInfo, setModalInfo] = useState({})
  const [action, setAction] = useState("")

  const [data, setData] = useState(sm_data) // found
  const columns = loadColumns()
  function loadColumns() {
    const columns = [{
      dataField: 'name',
      text: 'Document Name',
      formatter: DocumentLabel
    }];

    let counter = 0;

    employees.forEach(e => {
      columns.push({
        ...buttonColumn(e.id, e.name),
        formatter: ToggleBtn,
        headerFormatter: FormattedEmployee,
        headerTitle: (col, row) => employees[row-1].job,
        formatExtraData: {
          data: data,
          setData: setData,
          id: (counter++ % employees.length)
        }
      })
    })

    return columns
  }

  function changedState(e) {
    return e.state.includes('X')
  }

  function sing(state) {
    return state.replace('s', '')
  }

  function cancelSign() {
    return '-'
  }

  function resetSign(document, state){
    // TODO treba vediet kedy ma aj superior podpisovat
    return state.includes('s') ? 'es' : 'e'
  }

  function updateState(d, e) {
    if (!changedState(e)) return e
    // else
    let state = e.state.replace('X', '')
    if (action === 'sign')
      state = sing(state)
    if (action === 'cancelDuty')
      state = cancelSign()
    if (action === 'trainAgain')
      state = resetSign(d, state)
    return {...e, state: state} // updated employee
  }

  const handleAccept = () => {
    const update = data.map(d => {
      return {
        ...d,
        employees: d.employees.map(e => updateState(d, e))
      }
    })
    setData(update)
  };

  const handleExport = () => {
    // TODO implement export
    console.log('export is not implemented')
  };

  // if (error) {
  //   return <FetchError e={`Error: ${error.message}`}/>;
  // } else if (!isLoaded) {
  //   return <FetchLoading/>;
  // }

  return (
    <>
      <BootstrapTable
        keyField="id"
        classes="skill-matrix-table"
        data={data}
        columns={columns}
        // horizontal scroll
        wrapperClasses="table-responsive"
        rowClasses="text-nowrap"
      />
      <RowButtons
        setAction={setAction}
        setModalInfo={setModalInfo}
        setShowModal={setShowModal}
        handleAccept={handleAccept}
        handleExport={handleExport}
        showLegend={showLegend}
        setShowLegend={setShowLegend}
      />
      {showLegend &&
        <Legend/>
      }
      {showModal &&
        <ConfirmModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalInfo={modalInfo}
          handleAccept={handleAccept}
        />
      }
    </>
  )
}

export default SkillMatrix