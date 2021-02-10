import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {MissedBtn} from "../Buttons/TableBtns";
import CaptionElement from "../Others/CaptionElement";
import ConfirmModal from "../Modals/ConfirmModal";
import EmptyTable from "./EmptyTable";
import {FormattedDeadline, FormattedDate} from "../Others/Formatter";
import {fitBtn, orderBy} from "../../helpers/functions";

const MissedTrainings = ({trainings}) => {

  const [trns, setTrns] = useState(trainings);
  const [modalInfo, setModalInfo] = useState([])
  const [showModal, setShowModal] = useState(false)

  const handleAccept = () => {
    const signature_id = modalInfo.signatures[0].id
    fetchSign('/sign/training', signature_id)
    setTrns(trns.filter(t => t.signatures[0].id !== signature_id)) // TODO ak sa podaril fetch
    setShowModal(false);
  }

  const fetchSign = (url, id) => {
    // TODO ME duplicates lines
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
    sort: true
  }, {
    dataField: 'date',
    text: 'Date',
    sort: true,
    formatter: FormattedDate
  }, {
    dataField: 'deadline',
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

  return (
    <>
      <CaptionElement title="Trainings to sign"/>
      <BootstrapTable
        keyField="id"
        hover
        data={trns}
        columns={columns}
        noDataIndication={EmptyTable}
        defaultSorted={orderBy('deadline')}
      />
      { showModal &&
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

export default MissedTrainings;