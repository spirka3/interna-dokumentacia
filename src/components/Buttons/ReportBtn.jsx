import {Button} from "react-bootstrap";
import React from "react";

const ReportBtn = (cell, row) => {

  const handleClick = () => {
    console.log('Show me the report') // TODO ME
  }

  return(
    <Button onClick={handleClick} size={"sm"}>
      report
    </Button>
  );
};

export default ReportBtn;
