import React from "react";
import {Button} from "react-bootstrap";
import {hasSubs} from "../../functions";

export const MissedBtn = (cell, row, index, {setModalInfo, setShowModal}) => {

  const handleClick = () => {
    // if (!hasSubs(row)) {
    if (!row.require_superior) {
      console.log(row)
      setModalInfo(row);
      setShowModal(true);
    }
  }

  return (
    <Button onClick={handleClick} size="sm">
      {row.require_superior ? 'Details' : 'Sign'}
    </Button>
  );
};

/**
 * @return Sign Date or Details Button
 * */
export const SignedBtn = (cell, row) => {

  return row.require_superior
    ? <Button size="sm">Details</Button>
    : row.sign
};
