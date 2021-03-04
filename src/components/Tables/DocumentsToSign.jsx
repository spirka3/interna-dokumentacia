import React, {useState} from "react";
import ConfirmModal from "../Modals/ConfirmModal";
import {
  nonExpandableDocs,
  orderBy,
  require_superior,
  successResponse
} from "../../helpers/functions";
import MyBootstrapTable from "./MyBootstrapTable";
import {documentsToSignColumns, documentsToSignExpandColumns} from "./columns";

// const DocumentsToSign = ({showModal, setShowModal, data, fetchSign, modalInfo, setModalInfo}) => {
const DocumentsToSign = ({data, fetchSign, modalInfo, setModalInfo}) => {

  const [docs, setDocs] = useState(data.documents);
  const [showModal, setShowModal] = useState(false)

  const handleAccept = () => {
    if (require_superior(modalInfo) === false) {
      signAsEmployee(modalInfo.signatures[0].id)
    } else {
      signAsSuperior(modalInfo.id)
    }
    setShowModal(false);
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

  const columns = documentsToSignColumns(setModalInfo, setShowModal)
  const expandColumns = documentsToSignExpandColumns(setModalInfo, setShowModal)

  const expandRow = {
    onlyOneExpanding: true,
    nonExpandable: nonExpandableDocs(docs),
    renderer: (cell) => (
      <MyBootstrapTable
        classes="inner-table"
        data={cell.signatures}
        columns={expandColumns}
        order={orderBy('employee.last_name')}
      />
    )
  };

  return (
    <>
      <MyBootstrapTable
        title="Documents to sign"
        data={docs}
        columns={columns}
        order={orderBy('deadline.Time')}
        expandRow={expandRow}
      />
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalInfo={modalInfo}
        handleAccept={handleAccept}
      />
    </>
  )
};

export default DocumentsToSign;