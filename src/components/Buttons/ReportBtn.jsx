import {Button} from "react-bootstrap";
import React from "react";

const ReportBtn = (cell, row, index, {setReport}) => {

  const handleClick = () => {
    console.log(row)

    fetch(`/report/${row.id}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(r => console.log(r))
  }

  return(
    <Button onClick={handleClick} size={"sm"}>
      report
    </Button>
  );
};

export default ReportBtn;
