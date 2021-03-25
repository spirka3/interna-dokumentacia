import FoundDocuments from "./FoundDocuments";
import FoundTrainings from "./FoundTrainings";
import React from "react";

const FoundRecords = ({cs, documents, setDocuments, trainings, setTrainings, setReport }) => {

  return (
    <>
      <FoundDocuments
        found={documents}
        setFound={setDocuments}
        cs={cs}
        setReport={setReport}
      />
      <br/>
      <br/>
      <FoundTrainings
        found={trainings}
        setFound={setTrainings}
        cs={cs}
        setReport={setReport}
      />
    </>
  )
}

export default FoundRecords

