import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import EmptyTable from "./EmptyTable";
import SendBtn from "../Buttons/SendBtn";
import {FormattedDate} from "../Others/Formatter";
import {buttonColumn, orderBy} from "../../helpers/functions";
import {CustomAlert} from "../Others/CustomAlert";
import EditRecordModal from "../Modals/EditRecordModal";
import MyBootstrapTable from "./MyBootstrapTable";

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
    ...buttonColumn('EditBtn'),
    formatter: EditBtn,
    formatExtraData: {
      setFormData: setFormData,
    }
  }, {
    ...buttonColumn('SendBtn'),
    formatter: SendBtn,
    formatExtraData: {
      setNotification: setNotification,
      setSavedRec: setSavedRec
    }
  }];

  return (
    <>
      <MyBootstrapTable
        title="Saved trainings"
        data={savedRec}
        columns={columns}
        order={orderBy('deadline.Time')} // TODO
      />
      {notification &&
        <CustomAlert notification={notification}/>
      }
      {formData &&
        <EditRecordModal
          setRecords={setSavedRec}
          formData={formData}
          setFormData={setFormData}
        />
      }
    </>
  )
}

export default SavedTrainings;

