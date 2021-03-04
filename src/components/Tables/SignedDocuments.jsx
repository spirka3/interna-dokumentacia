import React from "react";
import MyBootstrapTable from "./MyBootstrapTable";
import {SignedBtn} from "../Buttons/TableBtns";
import {nonExpandableDocs, orderBy} from "../../helpers/functions";
import {
  FormattedEmployeeDate,
  FormattedRelease,
  FormattedSuperiorDate,
  FullName,
  NameWithLink
} from "../Others/Formatter";

const SignedDocuments = ({documents}) => {

  console.log('documents', documents)
  const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true,
    formatter: NameWithLink
  }, {
    dataField: 'release_date.Time',
    text: 'Release',
    sort: true,
    formatter: FormattedRelease
  }, {
    dataField: 'signatures[0].e_date.Time',
    text: 'Signed date',
    sort: true,
    formatter: SignedBtn
  }];

const expandColumns = [{
    dataField: 'employee.id',
    text: 'Employee ID',
    sort: true
  }, {
    dataField: 'employee.last_name',
    text: 'Full name',
    sort: true,
    formatter: FullName
  }, {
    dataField: 'e_date.Time',
    text: 'Employee Sign',
    sort: true,
    formatter: FormattedEmployeeDate
  },{
    dataField: 's_date.Time',
    text: 'My Sign',
    sort: true,
    formatter: FormattedSuperiorDate
  }];

  const expandRow = {
    onlyOneExpanding: true,
    nonExpandable: nonExpandableDocs(documents),
    renderer: (cell) => (
      <MyBootstrapTable
        classes="inner-table"
        data={cell.signatures}
        columns={expandColumns}
        order={orderBy('employee.last_name')}
      />
    )
  };

  return (
    <MyBootstrapTable
      title="Signed Documents"
      data={documents}
      columns={columns}
      expandRow={expandRow}
      order={orderBy('release_date.Time', 'desc')}
    />
  );
}

export default SignedDocuments;
