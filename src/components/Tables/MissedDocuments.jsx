import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {MissedBtn, MissedExpandBtn} from "../Buttons/TableBtns";
import CaptionElement from "../Others/CaptionElement";
import ConfirmModal from "../Modals/ConfirmModal";
import EmptyTable from "./EmptyTable";
import {fitBtn, nonExpandableDocs, orderBy, require_superior} from "../../helpers/functions";
import {FormattedDeadline, FormattedEmployeeDate, FormattedRelease, FullName, NameWithLink} from "../Others/Formatter";
import ConfirmExpandModal from "../Modals/ConfirmExpandModal";

const MissedDocuments = ({documents}) => {

  const [docs, setDocs] = useState(documents);
  const [showModal, setShowModal] = useState(false)
  const [modalInfo, setModalInfo] = useState({})
  const [showExpandModal, setShowExpandModal] = useState(false)
  const [modalExpandInfo, setModalExpandInfo] = useState({})

  const handleAccept = () => {
    if (require_superior(modalInfo)===false) { // TODO TEST
      signAsEmployee(modalInfo.signatures[0].id)
    } else {
      signAsSuperior(modalExpandInfo.id)
    }
    setShowModal(false);
  }

  /** Update sign date to Date.now()
   * @param url:
   *    '/sign' update employee date
   *    '/sign/superior' update superior date
   * @param id: id of the document_signature
   * */
  const fetchSign = (url, id) => {
    return fetch(url, {
      method: "POST",
      body: new URLSearchParams(`id=${id}`)
    })
  }

  const successResponse = (response) => {
    return 200 <= response.status && response.status <= 299
  }

  const signAsEmployee = (signature_id) => {
    fetchSign('/sign', signature_id)
      .then(res => {
        if (successResponse(res)){
          updateEmployeeDocs(signature_id)
        }
      })
  }

  const signAsSuperior = (signature_id) => {
    fetchSign('/sign/superior', signature_id)
      .then(res => {
        if (successResponse(res)){
          updateSuperiorDocs(signature_id)
        }
      })
  }

  const updateEmployeeDocs = (signature_id) => {
    setDocs(docs.filter(d => d.signatures[0].id !== signature_id))
  }

  const updateSuperiorDocs = (signature_id) => {
    const update = docs.map(d => {
      return {...d, signatures: d.signatures.filter(s => s.id !== signature_id)}
    })
    setDocs(update.filter(d => d.signatures.length));
  }

  const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true,
    formatter: NameWithLink
  }, {
    dataField: 'release_date.Time',
    text: 'Release',
    sort: true,
    formatter: FormattedRelease
  }, {
    dataField: 'deadline.Time',
    text: 'Deadline',
    sort: true,
    formatter: FormattedDeadline
  }, {
    dataField: 'signBtn',
    text: 'Sign',
    formatter: MissedBtn,
    formatExtraData: {
      setModalInfo: setModalInfo,
      setShowModal: setShowModal
    },
    headerStyle: fitBtn()
  }];

  const expandColumns = [{
    dataField: 'employee.id',
    text: 'Employee ID',
    sort: true,
  }, {
    dataField: 'employee.last_name',
    text: 'Full name',
    sort: true,
    formatter: FullName
  }, {
    dataField: 'e_date.Time',
    text: 'Sign Date',
    sort: true,
    formatter: FormattedEmployeeDate
  },{
    dataField: 'signBtn',
    text: '',
    formatter: MissedExpandBtn,
    formatExtraData: {
      setModalExpandInfo: setModalExpandInfo,
      setShowExpandModal: setShowExpandModal
    },
    headerStyle: fitBtn()
  }];

  const expandRow = {
    nonExpandable: nonExpandableDocs(documents),
    renderer: (cell) => (
      <BootstrapTable
        keyField="id"
        classes="inner-table"
        hover
        data={cell.signatures}
        columns={expandColumns}
        defaultSorted={orderBy('employee.last_name')}
      />
    )
  };

  return (
    <>
      <CaptionElement title="Documents to sign"/>
      <BootstrapTable
        keyField="id"
        hover
        data={docs}
        columns={columns}
        expandRow={expandRow}
        defaultSorted={orderBy('deadline.Time')}
        noDataIndication={EmptyTable}
      />
      {showModal &&
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalInfo={modalInfo}
        handleAccept={handleAccept}
      />
      }
      {showExpandModal &&
      <ConfirmExpandModal
        showModal={showExpandModal}
        setShowModal={setShowExpandModal}
        modalInfo={modalExpandInfo}
        handleAccept={handleAccept}
      />
      }
    </>
  )
}

export default MissedDocuments;