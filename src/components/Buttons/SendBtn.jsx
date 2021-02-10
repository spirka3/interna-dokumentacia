import {Button} from "react-bootstrap";
import React from "react";
import {recordType} from "../../helpers/functions";

const SendBtn = (cell, row, index, {data, setErrorMsg, setSuccessMsg, setSavedDocs}) => {

  const handleClick = () => {
    // TODO send record
    const record = data[index]
    console.log("send", record);
    const result = sendRecord(recordType(record), record.id)
    if (result) { // if successful TODO
      setSavedDocs(prev => prev.filter(d => d.id !== data[index].id));
      setSuccessMsg(`Record ${data[index].name} was successfully sent`)
    } else {
      setErrorMsg(`Sending the ${data[index].name} failed`)
    }
  }

  const sendRecord = (record, id) => { // TODO
    return fetch(`/${record}/confirm`, {
      method: "POST",
      body: new URLSearchParams(`${record}=${id}`)
    })
      .then(response => response.json())
      .then(res => {
        console.log(res)
        return res;
      })
      .catch((e) => console.log(e))
  }

  return(
    <Button id="save" variant="danger" size="sm" onClick={handleClick}>
      Send
    </Button>
  );
};

export default SendBtn;
