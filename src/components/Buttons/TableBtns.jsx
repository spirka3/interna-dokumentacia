import React from "react";
import {Button} from "react-bootstrap";
import {require_superior} from "../../helpers/functions";
import {FormattedSuperiorDate} from "../Others/Formatter";

export const MissedBtn = (cell, row, index, {setModalInfo, setShowModal}) => {

  const handleClick = () => {
    if (!require_superior(row)) {
      setModalInfo(row);
      setShowModal(true);
    }
  }

  return (
    <Button onClick={handleClick} size="sm" className="btn-block">
      {require_superior(row) ? 'Details' : 'Sign'}
    </Button>
  );
};

export const MissedExpandBtn = (cell, row, index, {setModalExpandInfo, setShowExpandModal}) => {

  const handleClick = () => {
    if (!require_superior(row)) {
      setModalExpandInfo(row);
      setShowExpandModal(true);
    }
  }

  return (
    <Button onClick={handleClick} size="sm" className="btn-block">
      {require_superior(row) ? 'Details' : 'Sign'}
    </Button>
  );
};

export const SignedBtn = (cell, row) => {
  return require_superior(row)
    ? <Button size="sm">Details</Button>
    : FormattedSuperiorDate(cell, row.signatures[0])
};

