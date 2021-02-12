import React from "react";

// Tables
export const require_superior = (document) => document.require_superior
export const recordType = (record) => Object.keys(record).includes('link') ? "document" : "training"
export const nonExpandableDocs = (documents) => {
  return documents
    .filter(doc => !require_superior(doc))
    .map(d => d.id);
}

export const fitBtn = () => {
  return { width: '1%'}
}
export const orderBy = (field, order='asc') => {
  return [{
    dataField: field,
    order: order
  }]
}

// Forms
export const getSelectOptions = (field) => {
  return (
    <>
      <option hidden value="">Select option ...</option>
      {field.map(value => <option>{value}</option>)}
    </>
  )
}


export const setOf = (array) => {
  const set = []
  array.forEach(arr => {
    if (!set.find(res => res.value === arr.value)) set.push(arr)
  })
  return set // array of unique objects by their .value
}


// Authentication
export const setUser = (user) => sessionStorage.setItem('user', JSON.stringify(user))
export const getUser = () => JSON.parse(sessionStorage.getItem('user'))
export const removeUser = () => sessionStorage.removeItem('user')
export const isAdmin = () => getUser() !== null && getUser().role === 'admin'


// Fetches
export const successResponse = (response) => {
  return 200 <= response.status && response.status <= 299
}


// Filter


// Helpers
export const delay = ms => new Promise(res => setTimeout(res, ms));

export const get_current_date = () => {
  const curr = new Date();
  curr.setDate(curr.getDate() + 3);
  return curr.toISOString().substr(0,10);
}
