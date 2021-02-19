import React from "react";
import {combinations, departments, divisions} from "./data";
import uuid from "react-uuid";

// Tables
export const buttonColumn = (field='',text='') => {
  return {
    dataField: field,
    text: text,
    headerStyle: { width: '1%'}
  }
}

export const recordType = (record) => Object.keys(record).includes('link') ? "document" : "training"
export const require_superior = (document) => document.require_superior
export const nonExpandableDocs = (documents) => {
  return documents.map(doc => {
      if (!require_superior(doc))
        return  doc.id
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
  return {
    variant: 'success',
    body: body
  }
}

export const badMsg = (body) => {
  return {
    variant: 'danger',
    body: body
  }
}

export const successResponse = (response) => 200 <= response.status && response.status <= 299
export const getLanguage = () => JSON.parse(sessionStorage.getItem('language'))
export const delay = ms => new Promise(res => setTimeout(res, ms));


// Add record forms
export const getFormID = (formData) => {
  return formData ? formData.id : 0
}

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

export const prepareCombinations = (combs) => {
  return combs.map(c => {
    return {
      branch: { value: c.branch_id, label: c.branch_name },
      division: { value: c.division_id, label: c.division_name },
      department: { value: c.department_id, label: c.department_name },
      city: { value: c.city_id, label: c.city_name },
    }
  })
}

export const getCombinationsNames = (formData, combinations) => { // FIXME
  if (!formData) return []
  const c = formData.assigned_to.split('&')
  return c.map(e => {
    const [b_id, c_id, dep_id, div_id] = e.split('; ')
    return {
      id: uuid(),
      branch: [{ value: b_id, label: getBranchName(b_id, combinations) }],
      division: [{ value: div_id, label: getDivisionName(div_id, combinations) }],
      department: [{ value: dep_id, label: getDepartmentName(dep_id, combinations) }],
      city: [{ value: c_id, label: getCityName(c_id, combinations) }]
    }
  })
}

const getBranchName = (id, combinations) => {
  return combinations.find(c=>''+c.branch.value === id).branch.label
}

const getDivisionName = (id, combinations) => {
  return combinations.find(c=>''+c.division.value === id).division.label
}

const getDepartmentName = (id, combinations) => {
  return combinations.find(c=>''+c.department.value === id).department.label
}

const getCityName = (id, combinations) => {
  return combinations.find(c=>''+c.city.value === id).city.label
}

export const getEmployeesNames = (formData, employees) => {
  if (!formData) return []
  return formData.unreleased_id_employees.split(',')
    .map(a => employees.find(e => ''+e.id === a))
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

const resolveCombinations = (combinations) => {
  let combs = flatBranch(combinations)
  combs = flatDivision(combs)
  combs = flatDepartment(combs)
  combs = flatCity(combs)
  return stringify(combs).join('&')
}

const flatBranch = (combs) => {
  const res = []
  combs.forEach(c => { if (!c.branch.length) res.push(c)
    c.branch.forEach(b => res.push({...c, branch: [b]}))
  })
  return res
}

const flatDivision = (combs) => {
  const res = []
  combs.forEach(c => { if (!c.division.length) res.push(c)
    c.division.forEach(f => res.push({...c, division: [f]}))
  })
  return res
}

const flatDepartment = (combs) => {
  const res = []
  combs.forEach(c => { if (!c.department.length) res.push(c)
    c.department.forEach(f => res.push({...c, department: [f]}))
  })
  return res
}

const flatCity = (combs) => {
  const res = []
  combs.forEach(c => { if (!c.city.length) res.push(c)
    c.city.forEach(f => res.push({...c, city: [f]}))
  })
  return res
}

const getID = (field) => {
  return field.length ? field[0].value : 'x'
}

const stringify = (combs) => {
  return combs.map(c => {
    return `${getID(c.branch)},${getID(c.city)},${getID(c.department)},${getID(c.division)}`
  })
}