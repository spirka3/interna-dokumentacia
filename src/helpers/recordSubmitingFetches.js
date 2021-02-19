import {successResponse} from "./functions";

export const upsert = (data, action) => {
  return fetch(`/document/${action}`, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(res => {
      if (successResponse(res)) {
        console.log('gg')
        // setNotification(goodMsg(`${action} was successful`))
      } else {
        console.log('bb')
        // setNotification(badMsg(`${action} failed`))
      }
      return res.json()
    })
    .catch((e) => console.log('error', e))
}