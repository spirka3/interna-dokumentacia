import React, {useState} from "react";
import DocumentsToSign from "../Tables/DocumentsToSign";
import TrainingsToSign from "../Tables/TrainingsToSign";
import {getUser} from "../../helpers/functions";
import {FetchError, FetchLoading} from "../Others/FetchComponents";
import useDataApi from "../../helpers/useDataApi";

const RecordsToSignPage = () => {

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

  const [showModal, setShowModal] = useState(false)
  const [modalInfo, setModalInfo] = useState([])

  if (error) {
    return <FetchError e={`Error: ${error.message}`}/>
  } else if (!isLoaded || !data) {
    return <FetchLoading/>
  }

  const props = {
    showModal,
    setShowModal,
    fetchSign,
    data,
    modalInfo,
    setModalInfo
  }

  return (
    <>
      <DocumentsToSign {...props} />
      <TrainingsToSign {...props} />
    </>
  )
}

export default RecordsToSignPage