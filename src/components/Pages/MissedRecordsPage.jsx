import React from "react";
import MissedDocuments from "../Tables/MissedDocuments";
import MissedTrainings from "../Tables/MissedTrainings";
import {getUser} from "../../helpers/functions";
import {FetchError, FetchLoading} from "../Others/FetchComponents";
import useDataApi from "../../helpers/useDataApi";

const MissedRecordsPage = () => {

  /** Update sign date to Date.now()
   * @param url:
   *    '/sign' update employee date
   *    '/sign/superior' update superior date
   * @param id: id of the document_signature
   * */
  const fetchSign = (url, id) => {
    return fetch(url, {
      method: "POST",
      body: new URLSearchParams(`id=${id}`)
    })
  }

  const URL = `/unsigned/signatures/${getUser().id}`;
  const [data, isLoaded, error] = useDataApi(URL);

  if (error) {
    return <FetchError e={`Error: ${error.message}`}/>
  } else if (!isLoaded || data === undefined) {
    return <FetchLoading/>
  }
  return (
    <>
      <MissedDocuments documents={data.documents} fetchSign={fetchSign}/>
      <MissedTrainings trainings={data.online_trainings} fetchSign={fetchSign}/>
    </>
  )
};

export default MissedRecordsPage;