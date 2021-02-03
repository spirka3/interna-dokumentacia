import React, {useEffect, useState} from "react";
import MissedDocuments from "../Tables/MissedDocuments";
import MissedTrainings from "../Tables/MissedTrainings";
import {getUser} from "../../functions";
import {FetchError, FetchLoading} from "../Others/FetchComponents";

const MissedRecordsPage = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [documents, setDocuments] = useState([]);
  const [trainings, setTrainings] = useState([]);

  // TODO TEST
  useEffect(() => {
    fetch(`http://localhost:7777/unsignedSignatures/${getUser().id}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
          setIsLoaded(true);
          setDocuments(data.documents);
          setTrainings(data.online_trainings);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  if (error) {
    return <FetchError e={`Error: ${error.message}`}/>;
  } else if (!isLoaded) {
    return <FetchLoading/>;
  }

  return (
    <>
      <MissedDocuments documents={documents}/>
      <MissedTrainings trainings={trainings}/>
    </>
  );
}

export default MissedRecordsPage;