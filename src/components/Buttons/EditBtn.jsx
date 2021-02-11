import {Button} from "react-bootstrap";
import React from "react";
import {recordType} from "../../helpers/functions";

const EditBtn = (cell, row, rowIndex, {setFormData, setFormType}) => {

  const handleClick = () => {
    setFormData(row);
    setFormType(`new_${recordType(row)}`)
  }

  return (
    <Button onClick={handleClick} size="sm" id="editBtn">Edit</Button>
  );
};

export default EditBtn;
