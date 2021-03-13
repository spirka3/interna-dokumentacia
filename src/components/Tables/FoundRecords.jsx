import React, {useContext, useEffect, useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import EditRecordModal from "../Modals/EditRecordModal";
import ReportBtn from "../Buttons/ReportBtn";
import {buttonColumn, orderBy} from "../../helpers/functions";
import EmptyTable from "./EmptyTable";
import {FormattedRelease} from "../Others/Formatter";
import MyBootstrapTable from "./MyBootstrapTable";

const FoundRecords = ({found, setFound}) => {

  const [formData, setFormData] = useState();

  const columns = [
  {
    dataField: 'name',
    text: "Name",
    sort: true
  }, {
    dataField: 'release_date.Time',
    text: 'Release',
    formatter: FormattedRelease,
    sort: true
  }, {
    dataField: 'type',
    text: 'Type',
    sort: true
  }, {
    dataField: 'branches',
    text: 'Branches',
    sort: true
  }, {
    dataField: 'divisions',
    text: 'Divisions',
    sort: true
  }, {
    dataField: 'departments',
    text: 'Departments',
    sort: true
  }, {
    dataField: 'cities',
    text: 'Cities',
    sort: true
  }, {
    dataField: 'record_type',
    text: 'Record',
    sort: true
  }, {
    dataField: 'complete',
    text: 'State',
    sort: true
  }, {
    ...buttonColumn('EditBtn'),
    formatter: EditBtn,
    formatExtraData: {
      setFormData: setFormData,
    }
  }, {
    ...buttonColumn('ReportBtn'),
    formatter: ReportBtn
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

export default FoundRecords;