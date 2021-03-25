import {Button} from "react-bootstrap";
import React from "react";

const ReportBtn = (cell, row, index, {setReport}) => {

  const handleClick = () => {
    console.log(row)

    // fetch(`/report/${row.id}`, {
    //   method: "GET",
    fetch(`/skill/matrix`, {
      method: "POST",
      body: new URLSearchParams(`document_id=${row.id}`)
    })
      .then(res => res.json())
      .then(r => setReport(r))
  }

  return(
    <Button onClick={handleClick} size={"sm"}>
      report
    </Button>
  );
};

export default ReportBtn;
