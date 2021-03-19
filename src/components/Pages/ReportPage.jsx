import React, {useEffect, useState} from 'react';
import {badMsg, buttonColumn, getFetch, orderBy, resolveCombinations} from "../../helpers/functions";
import MyBootstrapTable from "../Tables/MyBootstrapTable";
import {formatted} from "../Others/Formatter";

const ReportPage = ({location: {state}}) => {
  console.log(state.report)
  const record = state.report
  const [employees, setEmployees] = useState([]);

  // const assignedTo = resolveCombinations([combination])
  // console.log(assignedTo)

  useEffect(() => {
    getFetch(`/employees/${record.assigned_to}`)
      .then(data => {
        console.log(data)
        if (!data.length) {
          // setNotification(badMsg('not valid combination'))
          return
        }
        setEmployees(data)
      })
      .catch((e) => console.log("Errrrrrrrrrrror", e))
  }, []);

  const FullName = (_, row) => {
    console.log('row', row)
    return <>{row.first_name} {row.last_name}</>
  }

  const columns = [
    {
      ...buttonColumn("id"),
    }, {
      dataField: 'first_name',
      text: 'Full name',
      sort: true,
      formatter: FullName
    }, {
      dataField: 'e_date.Time',
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