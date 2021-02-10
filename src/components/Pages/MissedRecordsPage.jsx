import React from "react";
import MissedDocuments from "../Tables/MissedDocuments";
import MissedTrainings from "../Tables/MissedTrainings";
import {getUser} from "../../helpers/functions";
import {FetchError, FetchLoading} from "../Others/FetchComponents";
import useDataApi from "../../helpers/useDataApi";

const MissedRecordsPage = () => {

  const URL = `/unsigned/signatures/${getUser().id}`;

  const [data, isLoaded, error] = useDataApi(URL);

  if (error) {
    return <FetchError e={`Error: ${error.message}`}/>
  } else if (!isLoaded || data === undefined) {
    return <FetchLoading/>
  }

  return (
    <>
      <MissedDocuments documents={data.documents}/>
      <MissedTrainings trainings={data.online_trainings}/>
    </>
  )
}

export default MissedRecordsPage;