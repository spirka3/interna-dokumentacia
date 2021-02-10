import React, {useEffect, useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import EmptyTable from "./EmptyTable";
import {dbdocs} from "../../helpers/data";
import SendBtn from "../Buttons/SendBtn";
import {FormattedDeadline, FormattedRelease} from "../Others/Formatter";
import {fitBtn} from "../../helpers/functions";
import {ErrorAlert} from "../Others/ErrorAlert";
import {SuccessAlert} from "../Others/SuccessAlert";

const SavedRecords = ({setFormType, setFormData}) => {

  const [savedDocs, setSavedDocs] = useState(dbdocs);

  useEffect(() => {
    // TODO MATO get saved documents (edit = true) from DB
    // setSavedDocs(savedDocsFromDB)
  }, [])

  const [errorMsg, setErrorMsg] = useState()
  const [successMsg, setSuccessMsg] = useState()

  const columns = [{
    dataField: 'name',
    text: 'Name'
  }, {
    dataField: 'release',
    text: 'Release',
    formatter: FormattedRelease,
  }, {
    dataField: 'deadline',
    text: 'Deadline',
    formatter: FormattedDeadline,
  }, {
    dataField: 'editBtn',
    text: 'Edit',
    formatter: EditBtn,
    formatExtraData: {
      setFormType: setFormType,
      setFormData: setFormData
    },
    headerStyle: fitBtn()
  }, {
    dataField: 'sendBtn',
    text: 'Send',
    formatter: SendBtn,
    formatExtraData: {
      data: savedDocs,
      setErrorMsg: setErrorMsg,
      setSuccessMsg: setSuccessMsg,
      setSavedDocs: setSavedDocs
    },
    headerStyle: fitBtn()
  }];

  return (
    <>
      <BootstrapTable
        keyField="id"
        hover
        data={savedDocs}
        columns={columns}
        noDataIndication={EmptyTable}
      />
      {errorMsg && <ErrorAlert>{errorMsg}</ErrorAlert>}
      {successMsg && <SuccessAlert>{successMsg}</SuccessAlert>}
    </>
  )
}

export default SavedRecords;

