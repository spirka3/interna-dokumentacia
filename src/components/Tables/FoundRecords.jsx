import React, {useEffect, useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import EditRecordModal from "../Modals/EditRecordModal";
import ReportBtn from "../Buttons/ReportBtn";
import {buttonColumn, getCombinationsNames, getFieldName, orderBy} from "../../helpers/functions";
import EmptyTable from "./EmptyTable";
import {FormattedRelease} from "../Others/Formatter";

const FoundRecords = ({found, setFound, cs}) => {

  const [formData, setFormData] = useState();

  useEffect(() => {
    if(found.length && cs.length) {
      const rec = found.map(d => {
        const [b_id, c_id, de_id, di_id] = d.assigned_to.split('; ')
        const combination = cs.find(c =>
          c.city.value == c_id &&
          c.branch.value == b_id &&
          c.department.value == de_id &&
          c.division.value == di_id
        )
        if(combination) {
          return {
            ...d,
            branch: combination.branch.label,
            department: combination.department.label,
            division: combination.division.label,
            city: combination.city.label,
            record_type: 'document'
          }
        }
        return d
      })
      console.log(found)
      setFound(rec)
    }
  }, [])

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
    dataField: 'branch',
    text: 'Branch',
    sort: true
  }, {
    dataField: 'division',
    text: 'Division',
    sort: true
  }, {
    dataField: 'department',
    text: 'Department',
    sort: true
  }, {
    dataField: 'city',
    text: 'City',
    sort: true
  }, {
    dataField: 'record_type',
    text: 'Record Type',
    sort: true
  }, {
    dataField: 'Complete',
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
      <BootstrapTable
        keyField="id"
        hover
        data={found}
        columns={columns}
        defaultSorted={orderBy('name')}
        noDataIndication={EmptyTable}
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