import React, {useEffect} from "react";
import SignedDocuments from "../Tables/SignedDocuments";
import SignedTrainings from "../Tables/SignedTrainings";
import {docs} from "../../data";
import {getUser, setUser} from "../../functions";

const SignedRecordsPage = () => {

  // TODO MATO load signed documents - name, release date, deadline
  const documents = docs;

  // TODO MATO load signed trainings - name, date of event, deadline
  const trainings = [];

  return (
    <>
      <SignedDocuments documents={documents}/>
      <SignedTrainings trainings={trainings}/>
    </>
  );
}

export default SignedRecordsPage;
