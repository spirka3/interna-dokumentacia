import React, {useEffect, useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import EmptyTable from "./EmptyTable";
import SendBtn from "../Buttons/SendBtn";
import {FormattedDeadline, FormattedRelease} from "../Others/Formatter";
import {fitBtn} from "../../helpers/functions";
import {CustomAlert} from "../Others/CustomAlert";
import TableHeader from "../Others/TableHeader";
import EditRecordModal from "../Modals/EditRecordModal";

const SavedDocuments = ({documents}) => {

  const [formData, setFormData] = useState()
  const [savedRec, setSavedRec] = useState(documents);
  const [notification, setNotification] = useState()

  const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true
  }, {
    dataField: 'release_date.Time',
    text: 'Release',
    sort: true,
    formatter: FormattedRelease,
  }, {
    dataField: 'deadline.Time',
    text: 'Deadline',
    sort: true,
    formatter: FormattedDeadline,
  }, {
    dataField: 'editBtn',
    formatter: EditBtn,
    formatExtraData: {
      setFormData: setFormData,
    },
    headerStyle: fitBtn()
  }, {
    dataField: 'sendBtn',
    formatter: SendBtn,
    formatExtraData: {
      setNotification: setNotification,
      setSavedRec: setSavedRec
    },
    headerStyle: fitBtn()
  }];

  return (
    <>
      <TableHeader title="Saved documents"/>
      <BootstrapTable
        keyField="id"
        hover
        data={savedRec}
        columns={columns}
        noDataIndication={EmptyTable}
      />
      {notification &&
        <CustomAlert notification={notification}/>
      }
      {formData &&
        <EditRecordModal
          setSavedRec={setSavedRec}
          formData={formData}
          setFormData={setFormData}
        />
      }
    </>
  )
};

export default SavedDocuments;

