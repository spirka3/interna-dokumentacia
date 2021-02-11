import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {MissedBtn} from "../Buttons/TableBtns";
import CaptionElement from "../Others/CaptionElement";
import ConfirmModal from "../Modals/ConfirmModal";
import EmptyTable from "./EmptyTable";
import {fitBtn, nonExpandableDocs, orderBy, require_superior} from "../../helpers/functions";
import {FormattedDeadline, FormattedRelease, NameWithLink} from "../Others/Formatter";

const MissedDocuments = ({documents}) => {

  const [docs, setDocs] = useState(documents);
  const [showModal, setShowModal] = useState(false)
  const [modalInfo, setModalInfo] = useState({})

  const handleAccept = async () => {
    if (require_superior(modalInfo) === false) {
      const signature_id = modalInfo.signatures[0].id
      fetchSign('/sign', signature_id)
      setDocs(docs.filter(d => d.signatures[0].id !== signature_id)) // TODO ak sa podaril fetch, inak errorMessage
    } else {
      const signature_id = modalInfo.id
      fetchSign('/sign/superior', signature_id)
      const update = docs.map(d => {
        return {...d, signatures: d.signatures.filter(s => s.id !== signature_id)}
      })
      setDocs(update.filter(d => d.signatures.length)); // TODO ak sa podaril fetch
    }
    setShowModal(false);
  }

  /** Update sign date (e_date or s_date) to Date.now()
   * @param url: /sign update employee date
   *             /sign/superior update superior
   * @param id: id of document_signature
   * */
  const fetchSign = (url, id) => {
    console.log('fetch to', url, id)
    fetch(url, {
      method: "POST",
      body: new URLSearchParams(`id=${id}`)
    })
      .then(response => response.json())
      .then(res => {
        console.log("succeeded")
        console.log('res', res)
      })
      .catch(() => console.log("something goes wrong"))
  }

  const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true,
    formatter: NameWithLink
  }, {
    dataField: 'release_date',
    text: 'Release',
    sort: true, // FIXME
    formatter: FormattedRelease
  }, {
    dataField: 'deadline',
    text: 'Deadline',
    sort: true, // FIXME
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

  const expandColumns = [
    {
      dataField: 'employee.id',
      text: 'Employee ID',
      sort: true
    }, {
      dataField: 'employee.first_name',
      text: 'First name',
      sort: true
    }, {
      dataField: 'employee.last_name',
      text: 'Last Name',
      sort: true
    }, {
      dataField: 'signBtn',
      text: 'Sign',
      formatter: MissedBtn,
      formatExtraData: {
        setModalInfo: setModalInfo,
        setShowModal: setShowModal
      },
      headerStyle: fitBtn()
    }
  ];

  const expandRow = {
    nonExpandable: nonExpandableDocs(documents),
    renderer: (cell, row) => (
      <BootstrapTable
        keyField="id"
        classes="inner-table"
        hover
        data={docs[row].signatures}
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
        defaultSorted={orderBy('deadline')}
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
    </>
  )
}

export default MissedDocuments;