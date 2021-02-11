import React, {useEffect, useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import CaptionElement from "../Others/CaptionElement";
import {sm_data, employees} from "../../helpers/data";
import ToggleBtn from "../Buttons/ToggleBtn";
import ConfirmModal from "../Modals/ConfirmModal";
import {Legend, RowButtons} from "../Others/SkillMatrixComponents";
import {fitBtn} from "../../helpers/functions";
import {DocumentLabel, FormattedEmployee} from "../Others/Formatter";

const SkillMatrixPage = () => {

  // const [showLegend, setShowLegend] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [event, setEvent] = useState("")

  const documents = loadDocuments()
  const [data, setData] = useState(documents);

  const columns = loadColumns()

  function loadColumns() {
    const columns = [{
      dataField: 'name',
      text: 'Document Name',
      formatter: DocumentLabel
    }];

    let counter = 0;

  // TODO MATO load inferior employees
    employees.forEach(e => {
      columns.push({
        dataField: e.anet_id,
        text: e.name,
        formatter: ToggleBtn,
        headerFormatter: FormattedEmployee,
        headerTitle: (col, row) => employees[row-1].job,
        formatExtraData: {
          data: data,
          setData: setData,
          id: (counter++ % employees.length)
        },
        headerStyle: fitBtn()
      })
    })

    return columns
  }

  function loadDocuments() {
    // TODO MATO load documents
    return sm_data
  }

  function getState(document, state){
    return state.includes('s') ? 'es' : 'e' // FIXME treba vediet kedy ma aj superior podpisovat
  }

  const handleAccept = (event) => {

    const update = data.map(d => {

      let emp = d.employees.map(e => {

        if (e.state.includes('X')){
          let state = e.state.replace('X', '')
          if (event === 'sign')       state = state.replace('s', '')
          if (event === 'cancelDuty') state = '-'
          if (event === 'trainAgain') state = getState(d, state)
          return {...e, state: state} // updated employee
        }

        return e  // unchanged employee
      })

      return {...d, employees: emp}   // updated document
    })

    setData(update)
  };

  const handleExport = () => {
    // EXPORT TODO PATO
    console.log('export is not implemented')
  };

  // if (error) {
  //   return <FetchError e={`Error: ${error.message}`}/>;
  // } else if (!isLoaded) {
  //   return <FetchLoading/>;
  // }

  return (
    <>
      <CaptionElement title="Strečno"/>
      <BootstrapTable
        keyField="id"
        classes="skill-matrix-table"
        data={data}
        columns={columns}
        wrapperClasses="table-responsive"
        rowClasses="text-nowrap"
      />
      <RowButtons
        setEvent={setEvent}
        setShowModal={setShowModal}
        handleExport={handleExport}
      />
      {/*<Button onClick={() => setShowLegend(!showLegend)} size="sm">{showLegend ? 'Hide legend' : 'Show legend'}</Button>*/}
      {/*{showLegend &&*/}
      <Legend/>
      {/*}*/}
      {showModal &&
        <ConfirmModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalInfo={{name:"test"}}
          handleAccept={() => handleAccept(event)}
        />
      }
    </>
  );
};

export default SkillMatrixPage;