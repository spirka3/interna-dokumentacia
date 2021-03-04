import React from "react";
import uuid from "react-uuid";
import {comboFields} from "./data";

// Tables
export const buttonColumn = (field='',text='') => {
  return {
    dataField: field,
    text: text,
    headerStyle: { width: '1%' }
  }
}

export const recordType = (record) => {
  return Object.keys(record).includes('link')
    ? "document"
    : "training"
}

export const require_superior = (document) => document.require_superior

export const nonExpandableDocs = (documents) => {
  return documents.map(doc => {
      if (!require_superior(doc)) return doc.id
    }
  )
}

export const orderBy = (field, order='asc') => {
  return [{ dataField: field, order: order }]
}


// Authentication
export const setUser = (user) => sessionStorage.setItem('user', JSON.stringify(user))
export const getUser = () => JSON.parse(sessionStorage.getItem('user'))
export const removeUser = () => sessionStorage.removeItem('user')
export const isAdmin = () => getUser() !== null && getUser().role === 'admin'


// Helpers
export const goodMsg = (body) => {
  return { variant: 'success',  body: body }
}

export const badMsg = (body) => {
  return { variant: 'danger', body: body }
}

export const successResponse = (response) => {
  return 200 <= response.status && response.status <= 299
}

export const getLanguage = () => JSON.parse(sessionStorage.getItem('language'))
export const delay = ms => new Promise(res => setTimeout(res, ms));


// Add record forms
export const getFormID = form => form ? form.id : 0

export const getSelectOptions = (field) => {
  return <>
    <option hidden value="">Select option ...</option>
    { field.map(value => <option value={value} key={uuid()}>{value}</option>) }
  </>
}

export const setOf = (array) => {
  const set = []
  array.forEach(arr => {
    if (!set.find(res => res.value === arr.value)) set.push(arr)
  })
  return set // array of unique objects by their .value
}

// at least one field is not empty
export const isValidCombination = combination => {
  return comboFields.find(field => combination[field].length)
}

export const prepareCombinations = (combs) => {
  return combs.map(c => {
    const combination = {}
    comboFields.forEach(field => {
      combination[field] = {
        value: c[`${field}_id`],
        label: c[`${field}_name`]
      }
    })
    return combination
  })
}

export const prepareEmployees = (employees) => {
  return employees.map(e => {
    return {
      value: e.id,
      label: `${e.first_name} ${e.last_name}, [${e.id}]`
    }
  })
}

export const getCombinationsNames = (formData, combinations) => {
  if (!formData) return []
  return formData.assigned_to
    .split('&')
    .map(e => {
      const idx = e.split('; ')
      const combination = { id: uuid() }
      comboFields.forEach((field, i) => {
        combination[field] = [{
          value: idx[i],
          label: getFieldName(field, idx[i], combinations)
        }]
      })
      return combination
  })
}

export const getFieldName = (field, id, combinations) => {
  return combinations.find(c => `${c[field].value}` === id)[field].label
}

export const getEmployeesNames = (formData, employees) => {
  if (!formData) return []
  return formData.unreleased_id_employees.split(',')
    .map(a => employees.find(e => e.id == a))
}

export const prefillDocumentForm = (data) => {
  if (!data) return {}
  return {
    ...data,
    release_date: getDateString(data.release_date),
    deadline: getDateString(data.deadline),
  }
}

export const prefillTrainingForm = (data) => {
  if (!data) return {}
  return {
    ...data,
    date: getDateString(data.date),
    deadline: getDateString(data.deadline),
  }
}

export const correctTrainingFormData = (data, attendees) => {
  return {
    ...data,
    date: getDateObject(data.date),
    deadline: getDateObject(data.deadline),
    unreleased_id_employees: attendees.map(a => a.id).join(',')
  }
}

export const correctDocumentFormData = (data, combinations) => {
  return {
    ...data,
    release_date: getDateObject(data.release_date),
    deadline: getDateObject(data.deadline),
    assigned_to: resolveCombinations(combinations)
  }
}

const getDateObject = (date) => {
  return {
    Time: date + 'T00:00:00Z',
    Valid: true
  }
}

const getDateString = (date) => date.Time.substr(0, 10)

export const resolveCombinations = (combinations) => {
  let combs = combinations
  comboFields.forEach(field => {
    combs = flatField(field, combs)
  })
  return stringify(combs).join('&')
}

const flatField = (field, combs) => {
  const res = []
  combs.forEach(c => {
    if (!c[field].length)
      res.push(c)
    else
      c[field].forEach(b => {
        res.push({
          ...c,
          [field]: [b]
        })
      })
  })
  return res
}

const id = field => field.length ? field[0].value : 'x'

const stringify = (combs) => {
  return combs.map(c => `${id(c.branch)}; ${id(c.city)}; ${id(c.department)}; ${id(c.division)}`)
}


// fetch
export const myFetch = (url) => {
  return fetch(url, {
    mode: 'no-cors',
    method: "GET"
  }).then(result => result.json())
}
