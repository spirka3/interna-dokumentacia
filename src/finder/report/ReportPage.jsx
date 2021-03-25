import React, {useEffect, useState} from 'react';
import {badMsg, buttonColumn, getFetch, orderBy, resolveCombinations} from "../../utils/functions";
import MyBootstrapTable from "../../components/Tables/MyBootstrapTable";
import {formatted} from "../../utils/Formatter";

const ReportPage = ({location: {state}}) => {
  const record = state.report.documents[0]
  console.log(record)
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(record.signatures.map(sign => {
      const {employee} = sign
      const name = `${employee.first_name} ${employee.first_name} `
      return {
        name: name,
        date: formatted(sign.e_date?.Time)
      }
    }))
  }, []);

  const columns = [
    {
      ...buttonColumn("id"),
    }, {
      dataField: 'name',
      text: 'Full name',
      sort: true,
    }, {
      dataField: 'date',
      text: 'Sign Date',
      sort: true
    }
  ];

  return (
    <MyBootstrapTable
      title={`${record.name}, ${formatted(record.release_date.Time)}`}
      data={employees}
      columns={columns}
      defaultSorted={orderBy('name')}
      // horizontal scroll
      wrapperClasses="table-responsive"
      rowClasses="text-nowrap"
    />
  )
};

export default ReportPage;