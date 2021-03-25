import React, {useContext, useEffect, useState} from "react";
import Filter from "./Filter";
import SkillMatrix from "./skill-matrix/SkillMatrix";
import {prepareEmployees, getFetch, prepareCombinations, getCombinationsNames, postFetch} from "../utils/functions";
import {PairContext} from "../App";
import {Redirect} from "react-router";
import FoundRecords from "./FoundRecords";

const FinderPage = () => {
  const pairs = useContext(PairContext)

  const [documents, setDocuments] = useState([])
  const [trainings, setTrainings] = useState([]);
  const [report, setReport] = useState();

  const [cs, setCs] = useState([]); // all combinations
  const [es, setEs] = useState([]); // all employees
  const [em, setEm] = useState({}); // selected employee

  const [showSkillMatrix, setShowSkillMatrix] = useState(false)

  useEffect(() => {
    getFetch('/combinations').then(res => setCs(prepareCombinations(res)))
    getFetch('/employees/all').then(res => setEs(prepareEmployees(res)))
  })

  useEffect(() => {
    getFetch("/document/actual").then(res => setDocuments(prepareFoundRec(res)))
  }, [cs])

  const searchByCombination = (filter) => {
    console.log(filter)
    // FIX nejde branch a city
    postFetch(`/document/filter`, JSON.stringify(filter))
    .then(r => setDocuments(prepareFoundRec(r)))
  }

  const searchByEmployee = (employee) => {
    setEm(employee)
    setDocuments([])

    const id = employee.value
    getFetch(`/signed/signatures/${id}`)
      .then(r => {
        let trainings = addCompleteness(r.online_trainings, 100)
        setTrainings(prevState => [...prevState, ...trainings])

        let documents = addCompleteness(r.documents, 100)
        documents = prepareFoundRec(documents)
        setDocuments(prevState => [...prevState, ...documents])
      })

    getFetch(`/unsigned/signatures/${id}`)
      .then(r => {
        let trainings = addCompleteness(r.online_trainings, 0)
        setTrainings(prevState => [...prevState, ...trainings])

        let documents = addCompleteness(r.documents, 0)
        documents = prepareFoundRec(documents)
        setDocuments(prevState => [...prevState, ...documents])
      })
  }

  const matrixByFilter = (filter) => {
    setDocuments([])

    getFetch(`/skill/matrix`, new URLSearchParams(`filter=${filter}`))
      .then(r => setDocuments(r.documents))
  }
  const matrixBySuperior = (superior) => {
    setEm(superior)
    setDocuments([])

    const id = superior.value
    console.log(id)

    getFetch(`skill/matrix`, new URLSearchParams(`superior_id=${id}`))
      .then(r => setDocuments(r.documents))
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
    return (
      <Redirect to={{
        pathname: "/report",
        state: { report }}}
      />
    )
  }

  return (
    <div style={{marginTop: '1%'}} className="finder">
      {/*<div className="pb-4 corner-toolbar">*/}
      <Filter
        showSM={showSkillMatrix}
        setShowSM={setShowSkillMatrix}
        cs={cs}
        em={em}
        es={es}
        matrixByFilter={matrixByFilter}
        matrixBySuperior={matrixBySuperior}
        searchByEmployee={searchByEmployee}
        searchByCombination={searchByCombination}
      />
      {showSkillMatrix
        ? <SkillMatrix
            documents={documents}
          />
        : <FoundRecords
            cs={cs}
            documents={documents}
            setDocuments={setDocuments}
            trainings={trainings}
            setTrainings={setTrainings}
            setReport={setReport}
          />
      }
    </div>
  )
}

export default FinderPage;


















