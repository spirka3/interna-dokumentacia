import React from "react";
import {Button} from "react-bootstrap";

const TableBtn = (c, row, i, {setModalInfo, setShowModal}) => {

  const hasSubs = () => { return Object.keys(row).includes('sub') }

  const handleClick = () => {
    if (!hasSubs()) {
      setModalInfo(row);  // TODO TypeError: setModalInfo is not a function
      setShowModal(true);
    }
  }
  return (
    <Button onClick={handleClick}>
      {hasSubs() ? 'Details' : 'Sign'}
    </Button>
  );
};

export default TableBtn;
