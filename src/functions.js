import React from "react";

export const recordType = (row) => {
  if (Object.keys(row).includes('link')) {
    return "document";
  }
  return "training"
}

export const nonExpandableDocs = (documents) => {
  return documents.map(doc => !doc.require_superior ? doc.id : null);
}

export const getSelectOptions = (field) => {
  return field.map(value => <option>{value}</option>);
}


// Authentication
export const setUser = (user) => sessionStorage.setItem('user', JSON.stringify(user))
export const defUser = () => sessionStorage.setItem('user', JSON.stringify({name: "admin", pass: "admin", image: "/avatar1.png"}))
export const getUser = () => JSON.parse(sessionStorage.getItem('user'))
export const removeUser = () => sessionStorage.removeItem('user')

export const isAdmin = () => true
