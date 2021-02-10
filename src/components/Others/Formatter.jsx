import React from "react";
import {ExclamationTriangle} from "react-bootstrap-icons";
import {employees} from "../../helpers/data";


// Table records

export const NameWithLink = (cell, row) => {
  return <a href={row.name} target="_blank">{row.name}</a>
}

/**
 * Get formatted date to current row in tables
 * */

const formatted = (date) => date.substr(0,10).split("-").reverse().join(".");

export const FormattedDeadline = (cell, row) => {
  return <>{formatted(row.deadline.Time)}</>
}

export const FormattedRelease = (cell, row) => {
  return <>{formatted(row.release_date.Time)}</>
}

export const FormattedDate = (cell, row) => {
  return <>{formatted(row.date.Time)}</>
}

export const FormattedSuperiorDate = (cell, row) => {
  return <>{formatted(row.s_date.Time)}</>
}


// Skill-matrix

export const DocumentLabel = (col, row) => {

  const expired = row.deadline < Date.now() &&
    row.employees.find(e => e.state.includes("e") || e.state.includes("s"))

  return (
    <>
      {expired
        ? <h5>
            <ExclamationTriangle style={{color: "red", marginBottom: "6px"}}/>
            {" "}{NameWithLink(col, row)}
          </h5>
        : NameWithLink(col, row)
      }
    </>
  )
}

export const FormattedEmployee = (cell, row) => {
  const employee = employees[row-1]
  const percentage = 100 // TODO
  return (
    <div style={{fontSize: "12px"}}>
      {employee.name}, {employee.job}, {percentage}%
    </div>
  )
}