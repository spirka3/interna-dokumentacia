// import React from "react";
// import {Button, Form} from "react-bootstrap";
// import {badMsg, correctTrainingFormData, goodMsg, successResponse} from "../../helpers/functions";
//
// const SubmitBtns = ({handleSubmit, combinations}) => {
//
//   const onSubmit = (data, event) => {
//     if (attendees.length === 0){
//       setNotification(badMsg("At least one employee is required"))
//       return
//     }
//
//     data = correctTrainingFormData(data, attendees)
//     console.log(data)
//     const action = event.target.id
//
//     if (action === "save")
//       if (currentID) {
//         data = {...data, id: currentID}
//         upsert(data, 'update')
//         updateSavedRec(data)
//       } else {
//         upsert(data, 'create')
//           .then(r => setCurrentID(r.id))
//       }
//     if (action === "send"){
//       if (currentID) {
//         data = {...data, id: currentID}
//         if (actual) {
//           upsertConfirm(data, 'create/confirm')
//             .then(r => setCurrentID(r.id))
//         } else {
//           upsertConfirm(data, 'update/confirm')
//         }
//       } else {
//         upsertConfirm(data, 'create/confirm')
//           .then(r => setCurrentID(r.id))
//       }
//       filterSavedRec(data)
//       updateSavedRec(data)
//     }
//   }
//
//   const upsert = (data, action) => {
//     return fetch(`/training/${action}`, {
//       method: "POST",
//       body: JSON.stringify(data)
//     })
//       .then(res => {
//         if (successResponse(res)) {
//           setNotification(goodMsg(`${action} was successful`))
//         } else {
//           setNotification(badMsg(`${action} failed`))
//         }
//         return res.json()
//       }).catch((e) => console.log('error', e))
//   }
//
//   const upsertConfirm = (data, action) => {
//     return fetch(`/training/${action}`, {
//       method: "POST",
//       body: JSON.stringify(data)
//     }).then(res => {
//       if (successResponse(res)) {
//         setNotification(goodMsg(`${action} was successful`))
//       } else {
//         setNotification(badMsg(`${action} failed`))
//       }
//       return res.json()
//     }).catch((e) => console.log('error', e))
//   }
//
//   const filterSavedRec = (data) => {
//     setSavedRec(prevState => prevState.filter(p => p.id === data.id))
//   }
//
//   const updateSavedRec = (data) => {
//     setSavedRec(prevState => {
//       let update = prevState
//       const foundID = prevState.findIndex(p => p.id === data.id)
//       update[foundID] = data
//       console.log('cur', prevState)
//       return update
//     })
//   }
//
//   return(
//     <div onClick={handleSubmit(onSubmit)} className="pt-1 btn-block text-right">
//       <Button id="save" type="submit" className="mr-1">Save</Button>
//       <Button id="send" type="submit" variant="danger">Send</Button>
//     </div>
//   );
// };
//
// export default SubmitBtns;
