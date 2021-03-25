import React, {useEffect, useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import ToggleBtn from "./ToggleBtn";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import {Legend, RowButtons} from "./SkillMatrixComponents";
import {buttonColumn} from "../../utils/functions";
import {DocumentLabel, FormattedEmployee} from "../../utils/Formatter";

const SkillMatrix = ({documents: docs}) => {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // console.log(docs)
    setEmployees(docs[0].signatures.map(sign => sign.employee))
    const sm = docs.map(doc => {
      return {
        id: doc.id,
        name: doc.name,
        require_superior: doc.require_superior,
        deadline: doc.deadline.Time,
        employees: doc.signatures.map(sign => {
          return {
            id: sign.employee.id,
            state: getState(sign, doc.require_superior)
          }
        })
      }
    })
    // console.log(sm)
    setData(sm)
  }, []);

  function getState(sign, require_superior) {
    if (sign.cancel) return '-'

    let state = sign.e_date ? '' : 'e'
    if (require_superior && !sign.s_date) {
      state += 's'
    }
    return state;
  }

  const [showLegend, setShowLegend] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalInfo, setModalInfo] = useState({})
  const [action, setAction] = useState("")

  const columns = loadColumns()
  function loadColumns() {
    const columns = [{
      dataField: 'name',
      text: 'Document Name',
      formatter: DocumentLabel
    }];

    let counter = 0;

    employees.forEach((e) => {
      const name = `${e.first_name} ${e.last_name}`
      columns.push({
        ...buttonColumn(e.id, name),
        formatter: ToggleBtn,
        // headerFormatter: FormattedEmployee,
        // headerTitle: (col, row) => employees[row-1].job,
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

  function resetSign(doc, state){
    // TODO kto ma podpisovat?
    if (doc.require_superior) {
      return 'es'
    }
    return 'e' + state
  }

  function updateState(d, e) {
    if (!changedState(e)) return e

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

  const handleExport = () => {}; // TODO Export

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
      {showLegend && <Legend/>}
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalInfo={modalInfo}
        handleAccept={handleAccept}
      />
    </>
  )
}

export default SkillMatrix