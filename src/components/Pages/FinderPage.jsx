import React from "react";
import {Button, Form} from "react-bootstrap";
import Filter from "../Others/Filter";
import FoundRecords from "../Tables/FoundRecords";

const FinderPage = () => {
  return (
    <div style={{marginTop: '1%'}} className="finder">
      <Filter/>
      <FoundRecords/>
      {/* TODO PATO export */}
      <Button className="mr-1" size="sm">Export</Button>
      {/*<Button>Reset Filter</Button>*/}
    </div>
  )
}

export default FinderPage;
