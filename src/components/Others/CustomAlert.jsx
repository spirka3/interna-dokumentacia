import Alert from "react-bootstrap/Alert";

export const CustomAlert = ({notification}) => {

  // const [visible, setVisible] = useState(true);
  // useEffect(() => {
  //   setVisible(true);
  //   setTimeout(() => {
  //     setVisible(false);
  //   }, 5*1000);
  // }, [notification]);

  if (!notification) {
    return null
  }

  return <Alert variant={notification.variant}>{notification.body}</Alert>
}