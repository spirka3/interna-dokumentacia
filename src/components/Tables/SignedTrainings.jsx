import React from "react";
import {orderBy} from "../../helpers/functions";
import {FormattedDate, FormattedTrainingDate} from "../Others/Formatter";
import MyBootstrapTable from "./MyBootstrapTable";

const SignedTrainings = ({trainings}) => {

  const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true
  }, {
    dataField: 'date.Time',
    text: 'Took place',
    sort: true,
    formatter: FormattedDate
  }, {
    dataField: 'signatures[0].date.Time', // always array with length of 1 [by SQL query]
    text: 'Signed date',
    sort: true,
    formatter: FormattedTrainingDate
  }];

  return (
    <MyBootstrapTable
      title="Signed Trainings"
      data={trainings}
      columns={columns}
      order={orderBy('date.Time', 'desc')}
    />
  )
}

export default SignedTrainings;