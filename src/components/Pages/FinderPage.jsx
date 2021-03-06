import React, {useEffect, useState} from "react";
import Filter from "../Others/Filter";
import FoundRecords from "../Tables/FoundRecords";
import SkillMatrix from "../Tables/SkillMatrix";
import {prepareEmployees, myFetch, prepareCombinations} from "../../helpers/functions";

const FinderPage = () => {

  const [showSkillMatrix, setShowSkillMatrix] = useState(false)

  const [cs, setCs] = useState([]);
  useEffect(() => {
    fetch('/combinations', {
      method: "GET",
    })
      .then(response => response.json())
      .then(res => {
        const combs = prepareCombinations(res)
        setCs(combs)
      })
      .catch((e) => console.log(e))
  },[])

  const [e, setE] = useState([]);
  useEffect(() => {
    fetch('/employees/all', {
      method: "GET",
    })
    .then(response => response.json())
    .then(res => {
      setE(prepareEmployees(res))
    })
    .catch((e) => console.log(e))
  },[])

  const [found, setFound] = useState([])
  useEffect(() => {
    myFetch("/document/actual")
      .then(data => setFound(data))
  }, [])

  const handleSearch = (filter) => {
    console.log(filter)
    fetch(`/document/filter`, {
      method: "POST",
      body: JSON.stringify(filter)
    })
    .then(res => res.json())
    .then(r => prepareFoundRec(r))
  }

  const prepareFoundRec = (found) => {
    console.log('a')
    if(found.length && cs.length) {
      console.log('b')
      const rec = found.map(d => {
        const [b_id, c_id, de_id, di_id] = d.assigned_to.split('; ')
        const combination = cs.find(c =>
          c.city.value == c_id &&
          c.branch.value == b_id &&
          c.department.value == de_id &&
          c.division.value == di_id
        )
        if(combination) {
          return {
            ...d,
            branch: combination.branch.label,
            department: combination.department.label,
            division: combination.division.label,
            city: combination.city.label,
            record_type: 'document'
          }
        }
        return d
      })
      console.log(found)
      setFound(rec)
    }
  }

  if (!cs.length) return <h1>Loading.. combinations</h1>
  if (!e.length) return <h1>Loading.. employees</h1>
  if (!found.length) return <h1>Loading.. records</h1>

  return (
    <div style={{marginTop: '1%'}} className="finder">
      <Filter
        showSM={showSkillMatrix}
        setShowSM={setShowSkillMatrix}
        cs={cs}
        e={e}
        found={found}
        handleSearch={handleSearch}
      />
      {showSkillMatrix
        ? <SkillMatrix
            found={found}
          />
        : <FoundRecords
            found={found}
            setFound={setFound}
            cs={cs}
          />
      }
    </div>
  )
}

export default FinderPage;
