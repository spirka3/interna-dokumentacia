import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {MissedBtn} from "../Buttons/TableBtns";
import TableHeader from "../Others/TableHeader";
import ConfirmModal from "../Modals/ConfirmModal";
import EmptyTable from "./EmptyTable";
import {FormattedDeadline, FormattedDate} from "../Others/Formatter";
import {buttonColumn, orderBy, successResponse} from "../../helpers/functions";

const TrainingsToSign = ({trainings: trn, fetchSign}) => {

  const [trainings, setTrainings] = useState(trn);
  const [modalInfo, setModalInfo] = useState([])
  const [showModal, setShowModal] = useState(false)

  const handleAccept = () => {
    signAsEmployee(modalInfo.signatures[0].id)
    setShowModal(false);
  }

  const signAsEmployee = (signature_id) => {
    fetchSign('/sign/training', signature_id)
      .then(res => {
        if (successResponse(res)){
          updateTrainings(signature_id)
        }
      })
  }

  const updateTrainings = (signature_id) => {
    setTrainings(trainings.filter(t => t.signatures[0].id !== signature_id))
  }

  const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true
  }, {
    dataField: 'date.Time',
    text: 'Date',
    sort: true,
    formatter: FormattedDate
  }, {
    dataField: 'deadline.Time',
    text: 'Deadline',
    sort: true,
    formatter: FormattedDeadline
  }, {
    ...buttonColumn(),
    formatter: MissedBtn,
    formatExtraData: {
      setModalInfo: setModalInfo,
      setShowModal: setShowModal
    }
  }];

  return (
    <>
      <TableHeader title="Trainings to sign"/>
      <BootstrapTable
        keyField="id"
        hover
        data={trainings}
        columns={columns}
        noDataIndication={EmptyTable}
        defaultSorted={orderBy('deadline.Time')}
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

export default TrainingsToSign;