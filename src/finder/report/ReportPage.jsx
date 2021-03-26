import React, { useEffect, useState } from "react";
import { buttonColumn, getFetch, orderBy } from "../../utils/functions";
import MyBootstrapTable from "../../components/Tables/MyBootstrapTable";
import { formatted } from "../../utils/Formatter";

const ReportPage = ({ location: { search } }) => {
  const [record, setRecord] = useState();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const split = search.split("=");
    if (split.length !== 2) return null;

    const [query, id] = split;
    if (query !== "?id") return null;
    if (parseInt(id) != id) return null;

    // getFetch(`/report/${row.id}`)
    fetch(`/skill/matrix`, {
      method: "POST",
      body: new URLSearchParams(`document_id=${id}`),
    })
      .then((res) => res.json())
      .then((r) => {
        console.log(r);
        const rec = r.documents[0];
        setRecord(rec);

        setEmployees(
          rec.signatures.map((sign) => {
            const { employee: e } = sign;
            return {
              name: `${e.first_name} ${e.first_name}`,
              date: formatted(sign.e_date?.Time),
            };
          })
        );
      });
  }, []);

  if (!record) return null;

  const columns = [
    {
      ...buttonColumn("id"),
    },
    {
      dataField: "name",
      text: "Full name",
      sort: true,
    },
    {
      dataField: "date",
      text: "Sign Date",
      sort: true,
    },
  ];

  const title = `${record.name}, ${formatted(record.release_date?.Time)}`;

  return (
    <MyBootstrapTable
      title={title}
      data={employees}
      columns={columns}
      defaultSorted={orderBy("name")}
      // horizontal scroll
      wrapperClasses="table-responsive"
      rowClasses="text-nowrap"
    />
  );
};

export default ReportPage;
