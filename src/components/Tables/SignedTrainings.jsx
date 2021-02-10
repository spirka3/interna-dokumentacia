import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import CaptionElement from "../Others/CaptionElement";
import EmptyTable from "./EmptyTable";
import {FormattedDate} from "../Others/Formatter";
import {orderBy} from "../../helpers/functions";

const MissedTrainings = ({trainings}) => {

  const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true
  }, {
    dataField: 'took_place',
    text: 'Took place',
    sort: true,
    formatter: FormattedDate
  }, {
    dataField: 'signatures[0]', // always array with length of 1 [by SQL query]
    text: 'Signed date',
    sort: true,
    formatter: FormattedDate
  }];

  return (
    <>
      <CaptionElement title="Trainings to sign"/>
      <BootstrapTable
        keyField="id"
        hover
        data={trainings}
        columns={columns}
        noDataIndication={EmptyTable}
        defaultSorted={orderBy('signatures[0].date.Time', 'desc')}
      />
    </>
  )
}

export default MissedTrainings;