import {Button} from "react-bootstrap";
import React from "react";

const ReportBtn = (cell, row, index, {setReport}) => {

  const handleClick = () => setReport(row)

  return(
    <Button onClick={handleClick} size={"sm"}>
      report
    </Button>
  );
};

export default ReportBtn;
