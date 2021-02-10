import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import CaptionElement from "../Others/CaptionElement";
import {SignedBtn} from "../Buttons/TableBtns";
import {nonExpandableDocs, orderBy} from "../../helpers/functions";
import EmptyTable from "./EmptyTable";
import {FormattedRelease, FormattedSuperiorDate, NameWithLink} from "../Others/Formatter";

const SignedDocuments = ({documents}) => {

  console.log('documents', documents)
  const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true,
    formatter: NameWithLink
  }, {
    dataField: 'release',
    text: 'Release',
    sort: true, // FIXME
    formatter: FormattedRelease
  }, {
    dataField: 'signature',
    text: 'Signed date',
    formatter: SignedBtn
  }];

const expandColumns = [{
    dataField: 'employee.id',
    text: 'Employee ID',
    sort: true
  }, {
    dataField: 'employee.first_name',
    text: 'First name',
    sort: true
  }, {
    dataField: 'employee.last_name',
    text: 'Last Name',
    sort: true
  }, {
    dataField: 's_date.time',
    text: 'Sign date',
    formatter: FormattedSuperiorDate
  }];

  const expandRow = {
    nonExpandable: nonExpandableDocs(documents),
    renderer: (cell, row) => (
      <BootstrapTable
        keyField="id"
        classes="inner-table"
        hover
        data={documents[row].signatures}
        columns={expandColumns}
        defaultSorted={orderBy('employee.last_name')}
      />
    )
  };

  return (
    <>
      <CaptionElement title="Signed Documents"/>
      <BootstrapTable
        keyField="id"
        hover
        data={documents}
        columns={columns}
        expandRow={expandRow}
        noDataIndication={EmptyTable}
        defaultSorted={orderBy('release', 'desc')} // FIXME
      />
    </>
  );
}

export default SignedDocuments;
