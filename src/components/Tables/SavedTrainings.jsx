import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import EmptyTable from "./EmptyTable";
import SendBtn from "../Buttons/SendBtn";
import {FormattedDate} from "../Others/Formatter";
import {fitBtn} from "../../helpers/functions";
import {CustomAlert} from "../Others/CustomAlert";
import TableHeader from "../Others/TableHeader";
import EditRecordModal from "../Modals/EditRecordModal";

const SavedTrainings = ({trainings}) => {

  const [formData, setFormData] = useState()
  const [savedRec, setSavedRec] = useState(trainings);
  const [notification, setNotification] = useState()

  const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true
  }, {
    dataField: 'date.Time',
    text: 'Release',
    sort: true,
    formatter: FormattedDate
  }, {
    dataField: 'place',
    text: 'Place',
    sort: true
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
      <TableHeader title="Saved trainings"/>
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
}

export default SavedTrainings;

