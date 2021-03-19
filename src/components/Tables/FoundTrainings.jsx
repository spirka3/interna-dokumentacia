import React, {useState} from "react";
import EditBtn from "../Buttons/EditBtn";
import EditRecordModal from "../Modals/EditRecordModal";
import ReportBtn from "../Buttons/ReportBtn";
import {buttonColumn, orderBy} from "../../helpers/functions";
import {FormattedDate, FormattedRelease} from "../Others/Formatter";
import MyBootstrapTable from "./MyBootstrapTable";

const FoundTrainings = ({found, setFound, setReport}) => {

  const [formData, setFormData] = useState();

  const Percentage = (col, row) => {
    return Math.round(row.complete * 100) / 100 + '%'
  }

  const columns = [
  {
    dataField: 'name',
    text: "Name",
    sort: true
  }, {
    dataField: 'date.Time',
    text: 'Release',
    formatter: FormattedDate,
    sort: true
  }, {
    dataField: 'lector',
    text: 'lector',
    sort: true
  }, {
    dataField: 'agency',
    text: 'agency',
    sort: true
  }, {
    dataField: 'place',
    text: 'place',
    sort: true
  }, {
    dataField: 'complete',
    text: 'State',
    formatter: Percentage,
    sort: true
  }, {
    ...buttonColumn('EditBtn'),
    formatter: EditBtn,
    formatExtraData: {
      setFormData: setFormData,
    }
  }, {
    ...buttonColumn('ReportBtn'),
      formatter: ReportBtn,
      formatExtraData: {
        setReport: setReport,
      }
  }];

  return (
    <>
      <MyBootstrapTable
        data={found}
        columns={columns}
        defaultSorted={orderBy('name')}
        // horizontal scroll
        wrapperClasses="table-responsive"
        rowClasses="text-nowrap"
      />
      {formData &&
        <EditRecordModal
          setRecords={setFound}
          formData={formData}
          setFormData={setFormData}
          actual={true}
        />
      }
    </>
  );
};

export default FoundTrainings;