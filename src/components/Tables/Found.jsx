import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import {documents} from "../../data";
import EditBtn from "../Buttons/EditBtn";
import SMBtn from "../Buttons/SMBtn";


const Found = () => {

    const columns = [
        {
            dataField: 'name',
            text: 'Name'
        }, {
            dataField: 'release',
            text: 'Release'
        }, {
            dataField: 'type',
            text: 'Type',
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
            dataField: 'recordType',
            text: 'Record Type'
        }, {
            dataField: 'state',
            text: 'State'
        }, {
            dataField: 'edit',
            text: 'Edit',
            formatter: EditBtn,
            formatExtraData: { // TODO
                setFormType: undefined,
                setFormData: undefined
            }
        }, {
            dataField: 'skillMatrix',
            text: 'SkillMatrix',
            formatter: SMBtn,
        }
    ];

    return (
      <>
          <BootstrapTable
            keyField="id"
            hover
            data={documents}
            columns={columns}
          />
      </>
    );
}

export default Found;

