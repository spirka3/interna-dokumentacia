import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import {docs} from "../../helpers/data";
import DocumentForm from "../Forms/DocumentForm";
import TrainingForm from "../Forms/TrainingForm";
import EditRecordModal from "../Modals/EditRecordModal";
import ReportBtn from "../Buttons/ReportBtn";
import {fitBtn, orderBy} from "../../helpers/functions";
import EmptyTable from "./EmptyTable";

const FoundRecords = () => {

  const [formType, setFormType] = useState('');
  const [formData, setFormData] = useState();

  const columns = [{
    dataField: 'name',
    text: "Name"
  }, {
    dataField: 'release',
    text: 'Release'
  }, {
    dataField: 'type',
    text: 'Type'
  }, {
    dataField: 'division',
    text: 'Division'
  }, {
    dataField: 'department',
    text: 'Department'
  }, {
    dataField: 'city',
    text: 'City'
  }, {
    dataField: 'record_type',
    text: 'Record Type'
  }, {
    dataField: 'state',
    text: 'State'
  }, {
    dataField: 'edit',
    text: 'Edit',
    formatter: EditBtn,
    formatExtraData: {
      setFormType: setFormType,
      setFormData: setFormData
    },
    headerStyle: fitBtn()
  }, {
    dataField: 'skillMatrix',
    text: 'Report',
    formatter: ReportBtn,
    headerStyle: fitBtn()
  }];

  return (
    <>
      <BootstrapTable
        keyField="id"
        hover
        data={docs}
        columns={columns}
        wrapperClasses="table-responsive"
        rowClasses="text-nowrap"
        defaultSorted={orderBy('name')}
        noDataIndication={EmptyTable}
      />
      {formType === 'new_document' &&
        <EditRecordModal
          setFormType={setFormType}
          form={() => <DocumentForm data={formData}/>}
        />
      }
      {formType === 'new_training' &&
        <EditRecordModal
          setFormType={setFormType}
          form={() => <TrainingForm data={formData}/>}
        />
      }
    </>
  );
};

export default FoundRecords;

