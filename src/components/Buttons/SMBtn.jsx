import {Button} from "react-bootstrap";
import React from "react";

const SMBtn = (cell, row) => {
  const handleClick = () => {
    console.log('Expand')
  }
  return(
    <Button onClick={handleClick}>
      Show SM
    </Button>
  );
};

export default SMBtn;
