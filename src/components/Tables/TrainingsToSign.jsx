import React, {useState} from "react";
import MyBootstrapTable from "./MyBootstrapTable";
import ConfirmModal from "../Modals/ConfirmModal";
import {orderBy, successResponse} from "../../helpers/functions";
import {trainingsToSignColumns} from "./columns";

const TrainingsToSign = ({showModal, setShowModal, data, fetchSign, modalInfo, setModalInfo}) => {

  const [trainings, setTrainings] = useState(data.online_trainings);

  const handleAccept = () => {
    signAsEmployee(modalInfo.signatures[0].id)
    setShowModal(false);
  }

  // TODO axios
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

  const columns = trainingsToSignColumns(setModalInfo, setShowModal)

  return (
    <>
      <MyBootstrapTable
        title="Trainings to sign"
        data={trainings}
        columns={columns}
        order={orderBy('deadline.Time')}
      />
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalInfo={modalInfo}
        handleAccept={handleAccept}
      />
    </>
  )
}

export default TrainingsToSign;