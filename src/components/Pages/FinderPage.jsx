import React, {useContext, useEffect, useState} from "react";
import Filter from "../Others/Filter";
import FoundRecords from "../Tables/FoundRecords";
import SkillMatrix from "../Tables/SkillMatrix";
import {prepareEmployees, getFetch, prepareCombinations, getCombinationsNames} from "../../helpers/functions";
import {PairContext} from "../../App";

const FinderPage = () => {
  const pairs = useContext(PairContext)
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
    getFetch("/document/actual")
      .then(data => prepareFoundRec(data))
  }, [cs])

  const handleSearch = (filter) => {
    console.log(filter)
    fetch(`/document/filter`, {
      method: "POST",
      body: JSON.stringify(filter)
    })
    .then(res => res.json())
    .then(r => prepareFoundRec(r))
  }

  function getLabels(cs, field){
    return cs.map(c => c[field].map((f) => f.label)).join(",")
  }

  const prepareFoundRec = (found) => {
    if(found.length && cs.length) {
      console.log(found)
      const rec = found.map(doc => {
        const doc_cs = getCombinationsNames(doc, pairs)
        return {
          ...doc,
          branches: getLabels(doc_cs, 'branches'),
          departments: getLabels(doc_cs, 'departments'),
          divisions: getLabels(doc_cs, 'divisions'),
          cities: getLabels(doc_cs, 'cities'),
          record_type: 'document'
        }
      })
      console.log(rec)
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
