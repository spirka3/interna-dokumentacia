import React from "react";
import {Button} from "react-bootstrap";

// Return true, if it's training document
export const hasSubs = (row) => { return Object.keys(row).includes('sub') }

export const MissingBtn = (c, row, i, {setModalInfo, setShowModal}) => {

  const handleClick = () => {
    if (!hasSubs(row)) {
      setModalInfo(row);  // TODO TypeError: setModalInfo is not a function
      setShowModal(true);
    }
  }
  return (
    <Button onClick={handleClick} size="sm">
      {hasSubs(row) ? 'Details' : 'Sign'}
    </Button>
  );
};

export const SignedBtn = (cell, row) => {
  const handleClick = () => {
    console.log('Expand')
  }
  return !hasSubs(row) ? row.sign : (
      <Button onClick={handleClick} size="sm">
        Details
      </Button>
  );
};
