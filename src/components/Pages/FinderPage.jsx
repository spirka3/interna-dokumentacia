import React, {useContext, useEffect, useState} from "react";
import Filter from "../Others/Filter";
import FoundDocuments from "../Tables/FoundDocuments";
import SkillMatrix from "../Tables/SkillMatrix";
import {prepareEmployees, getFetch, prepareCombinations, getCombinationsNames} from "../../helpers/functions";
import {PairContext} from "../../App";
import FoundTrainings from "../Tables/FoundTrainings";
import {employees} from "../../helpers/data";
import {Redirect} from "react-router";

const FinderPage = () => {
  const pairs = useContext(PairContext)

  const [documents, setDocuments] = useState([])
  const [trainings, setTrainings] = useState([]);
  const [showSkillMatrix, setShowSkillMatrix] = useState(false)
  const [cs, setCs] = useState([]);
  const [es, setEs] = useState([]);
  const [e, setE] = useState();
  const [report, setReport] = useState();

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

  useEffect(() => {
    fetch('/employees/all', {
      method: "GET",
    })
    .then(response => response.json())
    .then(res => {
      setEs(prepareEmployees(res))
    })
    .catch((e) => console.log(e))
  },[])

  useEffect(() => {
    getFetch("/document/actual")
      .then(data => setDocuments(prepareFoundRec(data)))
  }, [cs])

  const searchByCombination = (filter) => {
    console.log(filter)
    // FIX nejde branch a city
    fetch(`/document/filter`, {
      method: "POST",
      body: JSON.stringify(filter)
    })
    .then(res => res.json())
    .then(r => setDocuments(prepareFoundRec(r)))
  }

  const searchByEmployee = (employee) => {
    setE(employee)
    setDocuments([])

    const id = employee.value
    fetch(`/signed/signatures/${id}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(r => {
        let trainings = addCompleteness(r.online_trainings, 100)
        setTrainings(prevState => [...prevState, ...trainings])

        let documents = addCompleteness(r.documents, 100)
        documents = prepareFoundRec(documents)
        setDocuments(prevState => [...prevState, ...documents])
      })

    fetch(`/unsigned/signatures/${id}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(r => {
        let trainings = addCompleteness(r.online_trainings, 0)
        setTrainings(prevState => [...prevState, ...trainings])

        let documents = addCompleteness(r.documents, 0)
        documents = prepareFoundRec(documents)
        setDocuments(prevState => [...prevState, ...documents])
      })
  }

  const matrixBySuperior = (superior) => {
    // setE(superior)
    // setDocuments([])
    //
    // const id = superior.value
    // fetch(`/skill/matrix/${id}`, {
    //   method: "GET",
    // })
    //   .then(res => res.json())
    //   .then(r => {
    //     console.log(r)
    //   })
  }

  function addCompleteness(records, percentage) {
    return records.map(rec => {
      return { ...rec, complete: percentage }
    })
  }

  function getLabels(cs, field){
    const labels = cs.map(c => c[field].map((f) => f.label))
    const unique = [...new Set(labels.flat())];
    return unique.join(",")
  }

  const prepareFoundRec = (found) => {
    if(!found.length) return []

    return found.map(doc => {
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
  }

  if (!cs.length) return <h1>Loading.. combinations</h1>
  if (!es.length) return <h1>Loading.. employees</h1>
  if (!documents.length) return <h1>Loading.. records</h1>

  if (report) {
    return <Redirect to={{
      pathname: "/report",
      state: { report }
    }} />
  }

  return (
    <div style={{marginTop: '1%'}} className="finder">
      {/*<div className="pb-4 corner-toolbar">*/}
      <Filter
        showSM={showSkillMatrix}
        setShowSM={setShowSkillMatrix}
        cs={cs}
        e={e}
        es={es}
        matrixBySuperior={matrixBySuperior}
        searchByEmployee={searchByEmployee}
        searchByCombination={searchByCombination}
      />
      {/*</div>*/}
      {showSkillMatrix
        ? <SkillMatrix
            found={documents}
          />
        :
        <>
          <FoundDocuments
            found={documents}
            setFound={setDocuments}
            cs={cs}
            setReport={setReport}
          />
          <br/>
          <br/>
          <FoundTrainings
            found={trainings}
            setFound={setDocuments}
            cs={cs}
            setReport={setReport}
          />
        </>
      }
    </div>
  )
}

export default FinderPage;
