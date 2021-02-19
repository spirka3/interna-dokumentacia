import Alert from "react-bootstrap/Alert";
import {useEffect, useState} from "react";

export const CustomAlert = ({notification}) => {

  // const [visible, setVisible] = useState(true);
  // useEffect(() => {
  //   setVisible(true);
  //   setTimeout(() => {
  //     setVisible(false);
  //   }, 5*1000);
  // }, [notification]);
  if (notification === undefined) {
    return null
  }

  return (
      <>
      {/*{ visible ? */}
        <Alert variant={notification.variant}>{notification.body}</Alert>
        {/*: null*/}
      {/*}*/}
      </>
    )
}