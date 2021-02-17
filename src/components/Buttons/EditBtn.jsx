import React from "react";
import Button from "react-bootstrap/Button";
import {recordType} from "../../helpers/functions";

const EditBtn = (cell, row, index, {setFormData}) => {

  const handleClick = () => {
    setFormData(row)
  }

  return (
    <Button onClick={handleClick} size="sm" id="editBtn">Edit</Button>
  );
};

export default EditBtn;
